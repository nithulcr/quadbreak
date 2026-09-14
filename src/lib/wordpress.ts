import type { Client } from "@/types/client";
import type { Project, ProjectImage, ProjectSeo } from "@/types/project";
import type { Service } from "@/types/service";
import type { Testimonial } from "@/types/testimonial";

const WORDPRESS_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://hotpink-hamster-901951.hostingersite.com";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

const PROJECTS_ENDPOINT =
  `${WORDPRESS_URL}/wp-json/wp/v2/projects`;

const SERVICES_ENDPOINT =
  `${WORDPRESS_URL}/wp-json/wp/v2/services`;

const CLIENTS_ENDPOINT =
  `${WORDPRESS_URL}/wp-json/wp/v2/clients`;

const TESTIMONIALS_ENDPOINT =
  `${WORDPRESS_URL}/wp-json/wp/v2/testimonials`;

const MEDIA_ENDPOINT =
  `${WORDPRESS_URL}/wp-json/wp/v2/media`;

const RANK_MATH_HEAD_ENDPOINT =
  `${WORDPRESS_URL}/wp-json/rankmath/v1/getHead`;

const REVALIDATE_SECONDS = 60;

const GALLERY_FIELDS = [
  "gallery_image_1",
  "gallery_image_2",
  "gallery_image_3",
  "gallery_image_4",
  "gallery_image_5",
  "gallery_image_6",
  "gallery_image_7",
  "gallery_image_8",
  "gallery_image_9",
  "gallery_image_10",
] as const;

interface WordPressFeaturedMedia {
  source_url?: string;
}

interface WordPressEmbedded {
  "wp:featuredmedia"?: WordPressFeaturedMedia[];
}

export interface WordPressProject {
  id: number;
  slug: string;
  link?: string;

  title?: {
    rendered?: string;
  };

  content?: {
    rendered?: string;
  };

  acf?: Record<string, unknown> | null;

  _embedded?: WordPressEmbedded;
}

export interface WordPressContentPost {
  id: number;
  slug: string;
  link?: string;

  title?: {
    rendered?: string;
  };

  content?: {
    rendered?: string;
  };

  acf?: Record<string, unknown> | null;

  _embedded?: WordPressEmbedded;
}

/* -------------------------------------------------------
   HTML HELPERS
------------------------------------------------------- */

function decodeHtmlEntities(input: string): string {
  if (!input) return "";

  return input
    .replace(/&#(\d+);/g, (_match, code: string) =>
      String.fromCharCode(parseInt(code, 10)),
    )
    .replace(/&#x([0-9a-fA-F]+);/g, (_match, code: string) =>
      String.fromCharCode(parseInt(code, 16)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export function toPlainText(html?: string): string {
  if (!html) return "";

  return decodeHtmlEntities(
    html
      .replace(
        /<\s*(br|p|div|h[1-6]|li|tr)\s*\/?\s*>/gi,
        " ",
      )
      .replace(/<[^>]*>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim();
}

/* -------------------------------------------------------
   ACF HELPERS
------------------------------------------------------- */

function readAcfString(
  post: WordPressProject,
  key: string,
): string | undefined {
  const acf = post.acf;

  if (!acf || typeof acf !== "object") {
    return undefined;
  }

  const value = acf[key];

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed.length > 0) {
      return trimmed;
    }
  }

  if (typeof value === "number") {
    return String(value);
  }

  return undefined;
}

/* -------------------------------------------------------
   MEDIA RESOLUTION
------------------------------------------------------- */

/**
 * Fetches the source_url of an attachment through the standard
 * WordPress media REST endpoint.
 */
async function fetchMediaSourceUrl(
  attachmentId: string,
): Promise<string | undefined> {
  try {
    const response = await fetch(
      `${MEDIA_ENDPOINT}/${attachmentId}?_fields=source_url`,
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
        },
      },
    );

    if (!response.ok) {
      console.warn(
        `[WordPress] Failed to resolve media ID ${attachmentId}: ${response.status}`,
      );

      return undefined;
    }

    const data =
      (await response.json()) as {
        source_url?: unknown;
      };

    if (
      typeof data.source_url === "string" &&
      data.source_url.trim().length > 0
    ) {
      return data.source_url.trim();
    }

    return undefined;
  } catch (error) {
    console.warn(
      `[WordPress] Failed to resolve media ID ${attachmentId}:`,
      error,
    );

    return undefined;
  }
}

/**
 * Resolves an ACF image value into a full image URL.
 *
 * Supports:
 *
 * 1. URL string  -> "https://example.com/image.jpg"
 * 2. Image object -> { url: "..." } or { source_url: "..." }
 * 3. Numeric attachment ID -> 38
 * 4. Numeric string attachment ID -> "38"
 */
async function resolveMediaUrl(
  value: unknown,
): Promise<string | undefined> {
  // Case 2: ACF Image Array
  if (typeof value === "object" && value !== null) {
    const image = value as {
      url?: unknown;
      source_url?: unknown;
    };

    if (
      typeof image.url === "string" &&
      image.url.trim().length > 0
    ) {
      return resolveMediaUrl(image.url.trim());
    }

    if (
      typeof image.source_url === "string" &&
      image.source_url.trim().length > 0
    ) {
      return resolveMediaUrl(image.source_url.trim());
    }

    return undefined;
  }

  // Case 3: Numeric attachment ID
  if (typeof value === "number") {
    if (!Number.isFinite(value) || value <= 0) {
      return undefined;
    }

    return fetchMediaSourceUrl(String(value));
  }

  // Case 1 + 4: Strings (URL or numeric attachment ID)
  if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      return undefined;
    }

    // Numeric string attachment ID, e.g. "38"
    if (/^\d+$/.test(trimmed)) {
      return fetchMediaSourceUrl(trimmed);
    }

    // Regular URL
    if (/^https?:\/\/\S+$/i.test(trimmed)) {
      return trimmed;
    }

    return undefined;
  }

  return undefined;
}

/* -------------------------------------------------------
   FEATURED IMAGE
------------------------------------------------------- */

function featuredImageUrl(
  post: WordPressProject | WordPressContentPost,
): string | undefined {
  const url =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  if (typeof url === "string" && url.trim()) {
    return url.trim();
  }

  return undefined;
}

/* -------------------------------------------------------
   NORMALIZE SERVICE
------------------------------------------------------- */

export function normalizeWordPressService(
  post: WordPressContentPost,
): Service {
  const featuredImage = featuredImageUrl(post);

  const image: Service["image"] =
    featuredImage
      ? { url: featuredImage }
      : undefined;

  const service: Service = {
    id: post.id,
    title: decodeHtmlEntities(post.title?.rendered || ""),
    slug: post.slug,
    description: post.content?.rendered || "",
    image,
  };

  if (process.env.NODE_ENV === "development") {
    console.log("[WordPress] Service:", service);
  }

  return service;
}

/* -------------------------------------------------------
   NORMALIZE CLIENT
------------------------------------------------------- */

export function normalizeWordPressClient(
  post: WordPressContentPost,
): Client {
  const featuredImage = featuredImageUrl(post);

  const image: Client["image"] =
    featuredImage
      ? { url: featuredImage }
      : undefined;

  const client: Client = {
    id: post.id,
    title: decodeHtmlEntities(post.title?.rendered || ""),
    slug: post.slug,
    image,
  };

  if (process.env.NODE_ENV === "development") {
    console.log("[WordPress] Client:", client);
  }

  return client;
}

/* -------------------------------------------------------
   NORMALIZE TESTIMONIAL
------------------------------------------------------- */

/**
 * Parses the ACF rating field into a safe 0-5 number.
 *
 * Missing or invalid values default to 5.
 * Decimals are rounded to the nearest integer.
 */
function readRating(
  post: WordPressContentPost,
): number {
  const raw = readAcfString(post, "rating");

  if (raw === undefined) {
    return 5;
  }

  const parsed = Number.parseFloat(raw);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 5;
  }

  return Math.min(5, Math.max(1, Math.round(parsed)));
}

export function normalizeWordPressTestimonial(
  post: WordPressContentPost,
): Testimonial {
  const featuredImage = featuredImageUrl(post);

  const image: Testimonial["image"] =
    featuredImage
      ? { url: featuredImage }
      : undefined;

  const testimonial: Testimonial = {
    id: post.id,
    title: decodeHtmlEntities(post.title?.rendered || ""),
    slug: post.slug,
    content: toPlainText(post.content?.rendered),
    designation:
      readAcfString(post, "designation") || "",
    rating: readRating(post),
    image,
  };

  if (process.env.NODE_ENV === "development") {
    console.log("[WordPress] Testimonial:", testimonial);
  }

  return testimonial;
}

/* -------------------------------------------------------
   NORMALIZE PROJECT
------------------------------------------------------- */

export async function normalizeWordPressProject(
  post: WordPressProject,
): Promise<Project> {
  const rawTitle = post.title?.rendered || "";
  const description = post.content?.rendered || "";

  const featuredImage = featuredImageUrl(post);

  const banner =
    (await resolveMediaUrl(post.acf?.project_banner)) ||
    featuredImage;

  const galleryUrls = await Promise.all(
    GALLERY_FIELDS.map((field) =>
      resolveMediaUrl(post.acf?.[field]),
    ),
  );

  const projectGallery: ProjectImage[] = galleryUrls
    .filter(
      (url): url is string =>
        typeof url === "string" &&
        url.trim().length > 0,
    )
    .map((url) => ({ url }));

  const image: ProjectImage | undefined =
    featuredImage
      ? {
          url: featuredImage,
        }
      : undefined;

  const projectBanner: ProjectImage | undefined =
    banner
      ? {
          url: banner,
        }
      : undefined;

  const project: Project = {
    id: post.id,

    title: decodeHtmlEntities(rawTitle),

    slug: post.slug,

    // ACF
    category:
      readAcfString(
        post,
        "project_category",
      ) || "",

    tags:
      readAcfString(
        post,
        "project_tags",
      ) || "",

    shortDescription:
      readAcfString(
        post,
        "short_description",
      ) || "",

    // Native WordPress editor
    description,

    // ACF button
    buttonName:
      readAcfString(
        post,
        "button_name",
      ),

    buttonUrl:
      readAcfString(
        post,
        "button_url",
      ),

    // WordPress featured image
    image,

    // ACF banner
    projectBanner,

    // ACF gallery 1-10
    projectGallery,
  };

  if (process.env.NODE_ENV === "development") {
    debugProject(post, banner, galleryUrls);
  }

  return project;
}

/* -------------------------------------------------------
   DEBUG HELPER
------------------------------------------------------- */

function debugProject(
  post: WordPressProject,
  bannerUrl: string | undefined,
  galleryUrls: Array<string | undefined>,
) {
  console.log("======================================");
  console.log("WORDPRESS PROJECT");
  console.log("======================================");

  console.log("ID:", post.id);
  console.log("Slug:", post.slug);
  console.log("Title:", post.title?.rendered);

  console.log("ACF:", post.acf);

  console.log("Featured Image:", featuredImageUrl(post));

  console.log("Category:", readAcfString(post, "project_category"));

  console.log("Tags:", readAcfString(post, "project_tags"));

  console.log(
    "Short Description:",
    readAcfString(post, "short_description"),
  );

  console.log(
    "Button Name:",
    readAcfString(post, "button_name"),
  );

  console.log(
    "Button URL:",
    readAcfString(post, "button_url"),
  );

  console.log("Project Banner URL:", bannerUrl);

  console.log(
    "Gallery:",
    GALLERY_FIELDS.map((field, index) => ({
      field,
      url: galleryUrls[index],
    })),
  );

  console.log("======================================");
}

/* -------------------------------------------------------
   GET ALL PROJECTS
------------------------------------------------------- */

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      `${PROJECTS_ENDPOINT}?_embed&per_page=100`,
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
        },
      },
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch WordPress projects: ${response.status}`,
      );

      return [];
    }

    const posts =
      (await response.json()) as WordPressProject[];

    if (!Array.isArray(posts)) {
      return [];
    }

    if (process.env.NODE_ENV === "development") {
      console.log(
        "WordPress projects received:",
        posts.length,
      );
    }

    const normalizedProjects = await Promise.all(
      posts.map(normalizeWordPressProject),
    );

    return normalizedProjects;
  } catch (error) {
    console.error(
      "Failed to fetch WordPress projects:",
      error,
    );

    return [];
  }
}

/* -------------------------------------------------------
   GET PROJECT BY SLUG
------------------------------------------------------- */

export async function getProjectBySlug(
  slug: string,
): Promise<Project | null> {
  try {
    const encodedSlug =
      encodeURIComponent(slug);

    const response = await fetch(
      `${PROJECTS_ENDPOINT}?slug=${encodedSlug}&_embed&per_page=1`,
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
        },
      },
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch WordPress project "${slug}": ${response.status}`,
      );

      return null;
    }

    const posts =
      (await response.json()) as WordPressProject[];

    if (
      !Array.isArray(posts) ||
      posts.length === 0
    ) {
      return null;
    }

    return await normalizeWordPressProject(posts[0]);
  } catch (error) {
    console.error(
      `Failed to fetch WordPress project "${slug}":`,
      error,
    );

    return null;
  }
}

/* -------------------------------------------------------
   GET ALL SERVICES
------------------------------------------------------- */

export async function getServices(): Promise<Service[]> {
  try {
    const response = await fetch(
      `${SERVICES_ENDPOINT}?_embed&per_page=100`,
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
        },
      },
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch WordPress services: ${response.status}`,
      );

      return [];
    }

    const posts =
      (await response.json()) as WordPressContentPost[];

    if (!Array.isArray(posts)) {
      return [];
    }

    if (process.env.NODE_ENV === "development") {
      console.log(
        "WordPress services received:",
        posts.length,
      );
    }

    return posts.map(normalizeWordPressService);
  } catch (error) {
    console.error(
      "Failed to fetch WordPress services:",
      error,
    );

    return [];
  }
}

/* -------------------------------------------------------
   GET ALL CLIENTS
------------------------------------------------------- */

export async function getClients(): Promise<Client[]> {
  try {
    const response = await fetch(
      `${CLIENTS_ENDPOINT}?_embed&per_page=100`,
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
        },
      },
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch WordPress clients: ${response.status}`,
      );

      return [];
    }

    const posts =
      (await response.json()) as WordPressContentPost[];

    if (!Array.isArray(posts)) {
      return [];
    }

    if (process.env.NODE_ENV === "development") {
      console.log(
        "WordPress clients received:",
        posts.length,
      );
    }

    return posts.map(normalizeWordPressClient);
  } catch (error) {
    console.error(
      "Failed to fetch WordPress clients:",
      error,
    );

    return [];
  }
}

/* -------------------------------------------------------
   GET ALL TESTIMONIALS
------------------------------------------------------- */

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await fetch(
      `${TESTIMONIALS_ENDPOINT}?_embed&per_page=100`,
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
        },
      },
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch WordPress testimonials: ${response.status}`,
      );

      return [];
    }

    const posts =
      (await response.json()) as WordPressContentPost[];

    if (!Array.isArray(posts)) {
      return [];
    }

    if (process.env.NODE_ENV === "development") {
      console.log(
        "WordPress testimonials received:",
        posts.length,
      );
    }

    return posts.map(normalizeWordPressTestimonial);
  } catch (error) {
    console.error(
      "Failed to fetch WordPress testimonials:",
      error,
    );

    return [];
  }
}

/* -------------------------------------------------------
   RANK MATH
------------------------------------------------------- */

interface RankMathHeadTag {
  tag?: string;

  content?:
    | string
    | {
        name?: string;
        property?: string;
        content?: string;
        rel?: string;
        href?: string;
      };
}

function parseHeadContent(
  content: RankMathHeadTag["content"],
): string {
  if (typeof content === "string") {
    return content.trim();
  }

  if (
    typeof content === "object" &&
    content !== null &&
    typeof content.content === "string"
  ) {
    return content.content.trim();
  }

  return "";
}

function findHeadMeta(
  tags: RankMathHeadTag[],
  matcher: (
    content: {
      name?: string;
      property?: string;
      content?: string;
      rel?: string;
      href?: string;
    },
  ) => boolean,
): string {
  for (const tag of tags) {
    if (
      typeof tag.content !== "object" ||
      tag.content === null
    ) {
      continue;
    }

    if (matcher(tag.content)) {
      const value =
        tag.content.content ??
        tag.content.href;

      if (
        typeof value === "string" &&
        value.trim()
      ) {
        return value.trim();
      }
    }
  }

  return "";
}

function parseRankMathHead(
  data: unknown,
): ProjectSeo {
  const seo: ProjectSeo = {};

  /*
   * Rank Math normally returns an array of
   * head tags.
   */
  const tags = Array.isArray(data)
    ? (data as RankMathHeadTag[])
    : [];

  const title = tags.find(
    (tag) => tag.tag === "title",
  );

  if (title) {
    const value =
      parseHeadContent(title.content);

    if (value) {
      seo.title = value;
    }
  }

  const description = findHeadMeta(
    tags,
    (content) =>
      content.name === "description",
  );

  if (description) {
    seo.description = description;
  }

  /*
   * Rank Math does not normally expose
   * Focus Keyword as a standard SEO
   * <meta name="keywords"> tag.
   *
   * Do not pretend this is the focus keyword.
   */
  return seo;
}

export async function getRankMathSeo(
  slug: string,
): Promise<ProjectSeo | null> {
  const projectUrl =
    `${WORDPRESS_URL}/projects/${encodeURIComponent(slug)}/`;

  try {
    const response = await fetch(
      `${RANK_MATH_HEAD_ENDPOINT}?url=${encodeURIComponent(projectUrl)}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(
        `Rank Math API failed: ${response.status}`,
      );

      return null;
    }

    const data =
      (await response.json()) as unknown;

    return parseRankMathHead(data);
  } catch (error) {
    console.error(
      `Failed to fetch Rank Math SEO for "${slug}":`,
      error,
    );

    return null;
  }
}

/* -------------------------------------------------------
   CANONICAL
------------------------------------------------------- */

export function canonicalUrl(
  slug: string,
): string {
  const path = `/projects/${slug}`;

  if (!SITE_URL) {
    return path;
  }

  return `${SITE_URL.replace(/\/$/, "")}${path}`;
}