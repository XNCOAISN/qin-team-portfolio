import { Container, Title, TypographyStylesProvider } from "@mantine/core";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import { CenterLoader } from "src/components/CenterLoader";
import { Section } from "src/components/Section";
import { Layout } from "src/layouts";
import { Blog, useMicroCMSQuery } from "src/lib/microcms";

const BlogDetail: NextPage = () => {
  const { query } = useRouter();

  return (
    <Layout>
      {query?.blogId ? <Content slug={query.blogId as string} /> : null}
    </Layout>
  );
};

type ContentProps = {
  slug: string;
};

const Content: FC<ContentProps> = (props) => {
  const { slug } = props;
  const { data, error } = useMicroCMSQuery<Blog>("blog", 1, {
    filters: `slug[equals]${slug}`,
  });

  if (error) {
    return (
      <Container mt={40}>
        <Title order={2}>Error</Title>
      </Container>
    );
  }

  if (!data) {
    return <CenterLoader />;
  }

  if (data.length === 0) {
    return (
      <Container mt={40}>
        <Title order={2}>Not Found</Title>
      </Container>
    );
  }

  return (
    <Section title={data[0].title} mt={40}>
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: data[0].content }} />
      </TypographyStylesProvider>
    </Section>
  );
};

export default BlogDetail;
