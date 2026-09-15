export interface ProjectSeo {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export interface ProjectImage {
  url?: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string[];
  tags: string;
  shortDescription: string;
  description: string;
  buttonName?: string;
  buttonUrl?: string;
  image?: ProjectImage;
  projectBanner?: ProjectImage;
  projectGallery: ProjectImage[];
  seo?: ProjectSeo;
  wordpressUrl?: string;
}