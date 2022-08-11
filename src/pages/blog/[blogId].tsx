import type { NextPage } from "next";
import { BlogCard } from "src/components/BlogCard";
import { Section } from "src/components/Section";
import { LayoutWithHero } from "src/layouts/LayoutWithHero";

const BLOG = {
  title: "This is a header",
  description:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ",
  date: "2022.07.11",
};

const Blog: NextPage = () => {
  return (
    <LayoutWithHero>
      <Section title={BLOG.title} mt={40}>
        <BlogCard
          title={BLOG.title}
          description={BLOG.description}
          date={BLOG.date}
        />
      </Section>
    </LayoutWithHero>
  );
};

export default Blog;
