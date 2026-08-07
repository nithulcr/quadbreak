export function makeMediaUrl(raw?: string | null): string | null {
  if (!raw) return null;

  const cleaned = raw.trim();

  // If it's already a full URL (Cloudinary or external)
  if (/^https?:\/\//i.test(cleaned)) {
    return cleaned;
  }

  // Otherwise, prepend your Strapi API base URL
  const base = (process.env.NEXT_PUBLIC_STRAPI_API_URL || "").replace(/\/$/, "");
  const path = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  return `${base}${path}`;
}
