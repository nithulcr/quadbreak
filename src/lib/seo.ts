import type { Metadata } from "next";
import {
  absoluteUrl,
  defaultDescription,
  defaultOgImage,
  ogImageHeight,
  ogImageWidth,
  siteName,
} from "./site";

interface BuildMetadataInput {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  type?: "website" | "article" | "profile";
}

export function truncateDescription(
  value: string,
  maxLength = 160,
): string {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const truncated = normalized.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(" ");

  return `${(lastSpace > 80 ? truncated.slice(0, lastSpace) : truncated).trim()}…`;
}

export function buildMetadata({
  title,
  description = defaultDescription,
  path,
  keywords,
  image,
  imageAlt = `${siteName} – 3D game art and asset production`,
  noindex = false,
  type = "website",
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const resolvedImage = image
    ? /^https?:\/\//i.test(image)
      ? image
      : absoluteUrl(image)
    : absoluteUrl(defaultOgImage);

  const isDefaultImage = resolvedImage === absoluteUrl(defaultOgImage);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName,
      locale: "en_US",
      images: [
        {
          url: resolvedImage,
          alt: imageAlt,
          ...(isDefaultImage
            ? { width: ogImageWidth, height: ogImageHeight }
            : {}),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedImage],
    },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
