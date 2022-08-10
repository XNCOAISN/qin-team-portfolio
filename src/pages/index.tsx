import {
  Box,
  Center,
  Container,
  createStyles,
  Divider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { NextPage } from "next";
import { FC, ReactNode } from "react";
import { BlogCard } from "src/components/BlogCard";
import { ButtonLink } from "src/components/ButtonLink";
import { GitHubCard } from "src/components/GitHubCard";
import { Hero } from "src/components/Hero";
import { PortfolioCard } from "src/components/PortfolioCard";
import { Layout } from "src/layouts";

const BLOG_LIST = Array(4).fill({
  title: "This is a header",
  description:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ",
  date: "2022.07.11",
});

const PORTFOLIO_LIST = Array(4).fill({
  title: "IT KINGDOM",
  description:
    "当サロンのLPページ。React、Next.js、TypeScriptなどのモダンな技術を用いて作られています。初心者にちょうど良い難易度の制作物です。",
  startDate: "2021.10",
  endDate: "2021.12",
  thumbnail: "https://picsum.photos/400/200",
});

const GITHUB_LIST = Array(4).fill({
  name: "lightsound/nexst-tailwind",
  description: "Next.js starter template.",
  stars: 117,
  forks: 18,
  languages: [
    {
      name: "Typescript",
      value: 0.655,
      color: "#3178C6",
    },
    {
      name: "JavaScript",
      value: 0.337,
      color: "#F1E05A",
    },
    {
      name: "Other",
      value: 0.337,
      color: "#EDEDED",
    },
  ],
});

const useStyles = createStyles((theme) => ({
  portfolioList: {
    display: "grid",
    gap: theme.spacing.xl,
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  sectionGroup: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.xl,
    width: "100%",
    padding: 0,

    [theme.fn.largerThan("md")]: {
      flexDirection: "row",
      gap: 48,
    },
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();

  return (
    <Layout>
      <Stack spacing={80}>
        <section>
          <Hero />
        </section>
        <Section title="Blog">
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
              <ButtonLink href="#">View All</ButtonLink>
            </Center>
          </Stack>
        </Section>

        <Section title="Portfolio">
          <Stack spacing="xl">
            <Box className={classes.portfolioList}>
              {PORTFOLIO_LIST.map((value, index) => (
                <PortfolioCard
                  key={index}
                  title={value.title}
                  description={value.description}
                  startDate={value.startDate}
                  endDate={value.endDate}
                  thumbnail={value.thumbnail}
                />
              ))}
            </Box>
            <Center>
              <ButtonLink href="#">View All</ButtonLink>
            </Center>
          </Stack>
        </Section>

        <Container className={classes.sectionGroup}>
          <Section title="GitHub">
            <Stack spacing="xl">
              {GITHUB_LIST.map((value, index) => (
                <GitHubCard
                  key={index}
                  name={value.name}
                  description={value.description}
                  stars={value.stars}
                  forks={value.forks}
                  languages={value.languages}
                />
              ))}
              <Center>
                <ButtonLink href="#">View on GitHub</ButtonLink>
              </Center>
            </Stack>
          </Section>

          <Section title="Tmp"></Section>
        </Container>

        <section>
          <Box
            sx={{
              height: 1000,
              backgroundColor: "gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            tmp space
          </Box>
        </section>
      </Stack>
    </Layout>
  );
};

type SectionProps = {
  title: string;
  children?: ReactNode;
};

const Section: FC<SectionProps> = (props) => {
  const { children, title } = props;

  return (
    <section style={{ flex: 1 }}>
      <Container>
        <Title order={2}>
          <Text size={28}>{title}</Text>
        </Title>
        <Divider mt={20} />
        <Box py="xl">{children}</Box>
      </Container>
    </section>
  );
};

export default Home;
