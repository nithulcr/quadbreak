export interface ClientImage {
  url?: string;
}

export interface Client {
  id: number;
  title: string;
  slug: string;
  image?: ClientImage;
}