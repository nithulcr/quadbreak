export interface TestimonialImage {
  url?: string;
}

export interface Testimonial {
  id: number;
  title: string;
  slug: string;
  content: string;
  designation?: string;
  rating: number;
  image?: TestimonialImage;
}