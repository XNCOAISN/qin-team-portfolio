import { MicroCMSImage } from "microcms-js-sdk";

export type Blog = {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
};

export type Portfolio = {
  title: string;
  description: string;
  thumbnail: MicroCMSImage;
  startDate: string;
  endDate: string;
};

export type QueryOptions = {
  filters?: string;
  orders?: string;
};
