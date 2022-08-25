import dayjs from "dayjs";
import { Blog } from "src/lib/microcms";

import { BlogCardProps } from "./BlogCard";

export const blogCardFromMicroCMS = (blog: Blog): BlogCardProps => {
  const { title, description, slug, publishedAt } = blog;
  return {
    id: slug,
    title,
    description,
    date: dayjs(publishedAt).format("YYYY.MM.DD"),
  };
};
