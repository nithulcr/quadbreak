export interface ServiceImage {
  url?: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  image?: ServiceImage;
}