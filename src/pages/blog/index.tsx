import { Stack } from "@mantine/core";
import type { NextPage } from "next";
import { BlogCard, blogCardFromMicroCMS } from "src/components/BlogCard";
import { Section } from "src/components/Section";
import { Layout } from "src/layouts";
import { MicroCMSInfiniteScroll } from "src/lib/microcms";
import { Blog } from "src/lib/microcms";

const Blog: NextPage = () => {
  return (
    <Layout>
      <Section title="Blog" mt={40}>
        <MicroCMSInfiniteScroll
          endpoint="blog"
          limit={6}
          options={{
            orders: "-publishedAt",
          }}
          render={(items: Blog[]) => (
            <Stack spacing="xl">
              {items.map((item, index) => (
                <BlogCard key={index} {...blogCardFromMicroCMS(item)} />
              ))}
            </Stack>
          )}
        />
      </Section>
    </Layout>
  );
};

export default Blog;
