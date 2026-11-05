import {
  absoluteUrl,
  contactInfo,
  defaultDescription,
  defaultOgImage,
  siteName,
  siteUrl,
  socialLinks,
} from "./site";

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

export function siteSchemaGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteName,
        legalName: contactInfo.company,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/logo.png"),
        },
        image: absoluteUrl(defaultOgImage),
        description: defaultDescription,
        email: contactInfo.email,
        telephone: contactInfo.phone,
        foundingDate: "2016",
        founder: [
          { "@type": "Person", name: "Jesto Jose" },
          { "@type": "Person", name: "Mithun Alexander" },
        ],
        address: {
          "@type": "PostalAddress",
          ...contactInfo.address,
        },
        sameAs: Object.values(socialLinks),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteName,
        description: defaultDescription,
        publisher: { "@id": organizationId },
        inLanguage: "en",
      },
    ],
  };
}

export function servicesSchema(
  services: Array<{ title: string; description: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((service, index) => ({
      "@type": "Service",
      "@id": `${absoluteUrl("/services")}#service-${index + 1}`,
      name: service.title,
      description: service.description,
      serviceType: service.title,
      provider: { "@id": organizationId },
      areaServed: "Worldwide",
      url: absoluteUrl("/services"),
    })),
  };
}

interface ProjectSchemaInput {
  title: string;
  description: string;
  slug: string;
  images: string[];
  categories: string[];
  tags: string;
}

export function projectSchema({
  title,
  description,
  slug,
  images,
  categories,
  tags,
}: ProjectSchemaInput) {
  const url = absoluteUrl(`/portfolio/${slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#creativework`,
        name: title,
        description,
        url,
        image:
          images.length > 0
            ? images
            : [absoluteUrl(defaultOgImage)],
        creator: { "@id": organizationId },
        genre: categories,
        keywords: tags,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: absoluteUrl("/portfolio"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: url,
          },
        ],
      },
    ],
  };
}

export function portfolioSchema(
  projects: Array<{ title: string; slug: string; image?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/portfolio")}#collection`,
    name: "3D Game Art Portfolio – Quadbreak Studios",
    url: absoluteUrl("/portfolio"),
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/portfolio/${project.slug}`),
        name: project.title,
        ...(project.image
          ? {
              image: /^https?:\/\//i.test(project.image)
                ? project.image
                : absoluteUrl(project.image),
            }
          : {}),
      })),
    },
  };
}
