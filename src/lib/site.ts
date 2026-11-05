export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://quadbreak.vercel.app"
).replace(/\/$/, "");

export const siteName = "Quadbreak Studios";

export const defaultTitle =
  "Quadbreak Studios – 3D Game Art & Asset Production";

export const defaultDescription =
  "Quadbreak Studios creates high-quality 3D game assets, vehicles, weapons and environments for immersive gaming experiences.";

export const defaultOgImage = "/images/qb-poster.jpg";

export const ogImageWidth = 1280;
export const ogImageHeight = 640;

export const primaryKeywords = [
  "3D game art studio",
  "game-ready 3D assets",
  "3D vehicle modeling",
  "3D environment art",
  "3D weapon modeling",
];

export const secondaryKeywords = [
  "game asset outsourcing",
  "hard surface 3D modeling",
  "realistic 3D vehicle assets",
  "AAA game art production",
  "3D props for games",
];

export const siteKeywords = [...primaryKeywords, ...secondaryKeywords];

export const contactInfo = {
  company: "Quadbreak Studios Pvt Ltd",
  email: "business@quadbreak.com",
  phone: "+91 94007 69978",
  phoneHref: "tel:+919400769978",
  address: {
    streetAddress: "2nd Floor, City Center",
    addressLocality: "Iritty, Kannur",
    addressRegion: "Kerala",
    postalCode: "670703",
    addressCountry: "IN",
  },
};

export const socialLinks = {
  linkedin: "https://www.linkedin.com/company/quadbreakstudios",
  artstation: "https://www.artstation.com/quadbreakstudios",
  instagram: "https://www.instagram.com/quadbreak.studios/",
  whatsapp: "https://wa.me/919400769978",
};

export function absoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}
