// src/utils/api.ts
const API_URL: string = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

interface StrapiImage {
  url: string;
}

interface StrapiProject {
  id: number;
  attributes: {
    title: string;
    category: string;
    tech: string;
    slug?: string;
    url?: string;
    image?: {
      data?: {
        attributes: StrapiImage;
      };
    };
  };
}

export async function fetchProjects(): Promise<StrapiProject[]> {
  try {
    const res = await fetch(`${API_URL}/api/projects?populate=image`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Always fetch fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}


