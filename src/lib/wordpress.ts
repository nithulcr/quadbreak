import type { Client } from "@/types/client";
import type { Project, ProjectImage, ProjectSeo } from "@/types/project";
import type { RecentWork } from "@/types/recentWork";
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

const RECENT_WORKS_ENDPOINT =
  `${WORDPRESS_URL}/wp-json/wp/v2/recent_works`;

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
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&rdquo;/g, "\u201D")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
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

/**
 * Normalizes the ACF "project_category" value into a string[].
 *
 * ACF sets the value from the checkbox field, so it arrives as an
 * array. Legacy projects stored this field as plain text, so the
 * normalizer also accepts:
 *
 * - string      -> "gaming"             -> ["gaming"]
 * - string[]    -> ["3d-art","vehicles"]-> ["3d-art","vehicles"]
 * - number      -> 3                    -> ["3"]
 * - null        -> []; undefined -> []
 * - ""/[""]     -> []; empty items are dropped
 */
function readProjectCategory(post: WordPressProject): string[] {
  const value = post.acf?.project_category;

  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "number"
          ? String(item)
          : typeof item === "string"
            ? item.trim()
            : "",
      )
      .filter((item) => item.length > 0);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      return [];
    }

    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  if (typeof value === "number") {
    return [String(value)];
  }

  return [];
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
      readProjectCategory(
        post,
      ),

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

    // Original WordPress permalink (used internally for Rank Math)
    wordpressUrl: post.link || "",
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

  console.log("Category:", readProjectCategory(post));

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
   NORMALIZE RECENT WORK
------------------------------------------------------- */

export function normalizeWordPressRecentWork(
  post: WordPressContentPost,
): RecentWork {
  const featuredImage = featuredImageUrl(post) || "/images/seo.jpg";

  const recentWork: RecentWork = {
    id: post.id,
    title: decodeHtmlEntities(post.title?.rendered || ""),
    description: toPlainText(post.content?.rendered),
    image: featuredImage,
  };

  if (process.env.NODE_ENV === "development") {
    console.log("[WordPress] Recent Work:", recentWork);
  }

  return recentWork;
}

/* -------------------------------------------------------
   GET ALL RECENT WORKS
------------------------------------------------------- */

export async function getRecentWorks(): Promise<RecentWork[]> {
  try {
    const response = await fetch(
      `${RECENT_WORKS_ENDPOINT}?_embed&per_page=6&orderby=menu_order&order=asc`,
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
        },
      },
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch WordPress recent works: ${response.status}`,
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
        "WordPress recent works received:",
        posts.length,
      );
    }

    return posts.map(normalizeWordPressRecentWork);
  } catch (error) {
    console.error(
      "Failed to fetch WordPress recent works:",
      error,
    );

    return [];
  }
}

/* -------------------------------------------------------
   RANK MATH
------------------------------------------------------- */

function readHtmlAttribute(
  tag: string,
  attribute: string,
): string | undefined {
  const match = tag.match(
    new RegExp(
      `\\b${attribute}\\s*=\\s*(["'])(.*?)\\1`,
      "i",
    ),
  );

  return match?.[2];
}

/**
 * Extracts the Rank Math <head> payload as a raw HTML string.
 *
 * The Rank Math Headless API returns:
 *
 * {
 *   success: true,
 *   head: "<meta name=\"description\" .../><link rel=\"canonical\" .../>"
 * }
 *
 * Legacy shapes (a bare HTML string, or arrays) are also handled.
 */
function extractRankMathHead(data: unknown): string {
  if (typeof data === "string") {
    return data;
  }

  if (Array.isArray(data)) {
    return data
      .filter((item) => typeof item === "string")
      .join("\n");
  }

  if (data && typeof data === "object") {
    const wrapped = data as { head?: unknown };

    if (typeof wrapped.head === "string") {
      return wrapped.head;
    }

    if (Array.isArray(wrapped.head)) {
      return wrapped.head
        .filter((item) => typeof item === "string")
        .join("\n");
    }
  }

  return "";
}

/**
 * Scans an HTML string and returns the values of its
 * title, <meta> and <link> tags keyed by name / property
 * / rel.
 */
function parseMetaFromHtml(
  html: string,
): Record<string, string> {
  const found: Record<string, string> = {};

  const titleMatch = html.match(
    /<title[^>]*>([\s\S]*?)<\/title>/i,
  );

  if (titleMatch?.[1]) {
    found.title = decodeHtmlEntities(
      titleMatch[1].trim(),
    );
  }

  const tagRegex = /<(?:meta|link)\b[^>]*>/gi;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(html)) !== null) {
    const tag = match[0];

    const key =
      readHtmlAttribute(tag, "name") ||
      readHtmlAttribute(tag, "property") ||
      readHtmlAttribute(tag, "rel");

    if (!key) {
      continue;
    }

    const value =
      readHtmlAttribute(tag, "content") ||
      readHtmlAttribute(tag, "href");

    if (value && !(key in found)) {
      found[key] = decodeHtmlEntities(value.trim());
    }
  }

  return found;
}

function parseRankMathHead(
  data: unknown,
): ProjectSeo {
  const html = extractRankMathHead(data);
  const meta = parseMetaFromHtml(html);

  /*
   * Title priority:
   * <title> -> og:title -> twitter:title
   */
  const title =
    meta.title ||
    meta["og:title"] ||
    meta["twitter:title"];

  /*
   * Description priority:
   * <meta name="description"> -> og:description
   */
  const description =
    meta.description ||
    meta["og:description"];

  const seo: ProjectSeo = {
    title,
    description,
    canonical: meta.canonical,
    /*
     * Rank Math getHead does NOT emit a `<meta name="keywords">`
     * tag, so meta.keywords stays undefined unless Rank Math
     * actually returns one. Focus keywords are not mapped here.
     */
    keywords: meta.keywords,
    ogTitle: meta["og:title"],
    ogDescription: meta["og:description"],
    ogImage: meta["og:image"],
    twitterTitle: meta["twitter:title"],
    twitterDescription: meta["twitter:description"],
    twitterImage: meta["twitter:image"],
  };

  const hasSeoData = Object.values(seo).some(
    (value) => typeof value === "string" && value,
  );

  /*
   * Avoid consuming the WordPress "page not found"
   * head when Rank Math could not match the URL.
   */
  if (
    !hasSeoData ||
    (typeof title === "string" &&
      /page not found/i.test(title))
  ) {
    return {};
  }

  return seo;
}

function rankMathSeoFromJson(
  data: unknown,
): ProjectSeo | null {
  const seo = parseRankMathHead(data);

  const hasUsableSeo =
    seo.title ||
    seo.description ||
    seo.canonical ||
    seo.ogTitle ||
    seo.ogDescription ||
    seo.ogImage ||
    seo.twitterTitle ||
    seo.twitterDescription ||
    seo.twitterImage;

  if (!hasUsableSeo) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Rank Math] No usable SEO data could be parsed.",
      );
    }

    return null;
  }

  return seo;
}

export async function getRankMathSeo(
  wordpressUrl: string,
): Promise<ProjectSeo | null> {
  if (!wordpressUrl) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Rank Math] No WordPress URL provided, skipping.",
      );
    }

    return null;
  }

  /*
   * Rank Math's getHead route occasionally rejects
   * certain URL variants (a trailing slash) with a
   * REST 404 even though the post exists. Try the
   * original URL first, then the trimmed variant.
   */
  const candidates = [wordpressUrl];

  if (wordpressUrl.endsWith("/")) {
    candidates.push(wordpressUrl.replace(/\/$/, ""));
  }

  try {
    for (const url of candidates) {
      if (process.env.NODE_ENV === "development") {
        console.log("[Rank Math] URL:", url);
      }

      const response = await fetch(
        `${RANK_MATH_HEAD_ENDPOINT}?url=${encodeURIComponent(url)}`,
        {
          cache: "no-store",
        },
      );

      if (process.env.NODE_ENV === "development") {
        console.log("[Rank Math] Status:", response.status);
      }

      if (!response.ok) {
        continue;
      }

      const data =
        (await response.json()) as unknown;

      if (process.env.NODE_ENV === "development") {
        console.log("[Rank Math] Response:", data);
      }

      const seo = rankMathSeoFromJson(data);

      if (process.env.NODE_ENV === "development") {
        console.log("[Rank Math] Parsed SEO:", seo);
      }

      if (seo) {
        return seo;
      }
    }

    console.error(
      `Rank Math API failed for ${wordpressUrl}`,
    );

    return null;
  } catch (error) {
    console.error(
      "Failed to fetch Rank Math SEO:",
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
  const path = `/portfolio/${slug}`;

  if (!SITE_URL) {
    return path;
  }

  return `${SITE_URL.replace(/\/$/, "")}${path}`;
}