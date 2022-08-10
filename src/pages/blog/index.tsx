import { Center, createStyles, Loader, Stack } from "@mantine/core";
import type { NextPage } from "next";
import { BlogCard } from "src/components/BlogCard";
import { Hero } from "src/components/Hero";
import { Section } from "src/components/Section";
import { Layout } from "src/layouts";

const BLOG_LIST = Array(10).fill({
  title: "This is a header",
  description:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ",
  date: "2022.07.11",
});

const useStyles = createStyles((theme) => ({
  hero: {
    display: "none",
    [theme.fn.largerThan("md")]: {
      display: "block",
    },
  },
}));

const Blog: NextPage = () => {
  const { classes } = useStyles();

  return (
    <Layout>
      <div className={classes.hero}>
        <Hero />
      </div>

      <Section title="Blog" mt={40}>
        <Stack spacing="xl">
          {BLOG_LIST.map((value, index) => (
            <BlogCard
              key={index}
              title={value.title}
              description={value.description}
              date={value.date}
            />
          ))}
          <Center>
            <Loader />
          </Center>
        </Stack>
      </Section>
    </Layout>
  );
};

export default Blog;
