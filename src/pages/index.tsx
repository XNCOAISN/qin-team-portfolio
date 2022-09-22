import { Center, Container, createStyles, Stack } from "@mantine/core";
import dayjs from "dayjs";
import type { GetStaticProps, NextPage } from "next";
import { BlogCard, blogCardFromMicroCMS } from "src/components/BlogCard";
import { ButtonLink } from "src/components/ButtonLink";
import { CenterLoader } from "src/components/CenterLoader";
import { GitHubCard, GitHubCardProps } from "src/components/GitHubCard";
import {
  PortfolioCard,
  portfolioCardFromMicroCMS,
} from "src/components/PortfolioCard";
import { Section } from "src/components/Section";
import { TwitterCard, TwitterCardProps } from "src/components/TwitterCard";
import { LayoutWithHero } from "src/layouts/LayoutWithHero";
import { fetchRepositories } from "src/lib/github/fetch";
import { Blog, useMicroCMSQuery } from "src/lib/microcms";
import { Portfolio } from "src/lib/microcms";
import { fetchTimelineByUsername } from "src/lib/twitter/fetch-timeline";

type Props = {
  twitter: {
    timeline: TwitterCardProps[];
  };
  github: {
    repositories: GitHubCardProps[];
  };
};

const useStyles = createStyles((theme) => ({
  contents: {
    gap: 40,
    marginTop: 40,
    [theme.fn.largerThan("md")]: {
      gap: 80,
      marginTop: 80,
    },
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

const Home: NextPage<Props> = (props) => {
  const { twitter, github } = props;
  const { classes } = useStyles();

  return (
    <LayoutWithHero responsive={false}>
      <Stack className={classes.contents}>
        <Section title="Blog">
          <Blog />
        </Section>

        <Section title="Portfolio">
          <Portfolio />
        </Section>

        <Container className={classes.sectionGroup}>
          <Section title="GitHub">
            <Stack spacing="xl" sx={{ overflowY: "scroll", maxHeight: 600 }}>
              {github.repositories.map((value, index) => (
                <GitHubCard
                  key={index}
                  name={value.name}
                  description={value.description}
                  stars={value.stars}
                  forks={value.forks}
                  url={value.url}
                  languages={value.languages}
                />
              ))}
            </Stack>
            <Center mt="md">
              <ButtonLink href="https://github.com/lightsound" external>
                View on GitHub
              </ButtonLink>
            </Center>
          </Section>

          <Section title="Twitter">
            <Stack spacing="xl" sx={{ overflowY: "scroll", maxHeight: 600 }}>
              {twitter.timeline.map((value, index) => (
                <TwitterCard
                  key={index}
                  id={value.id}
                  icon={value.icon}
                  name={value.name}
                  screenName={value.screenName}
                  date={value.date}
                  source={value.source}
                />
              ))}
            </Stack>
            <Center mt="md">
              <ButtonLink
                href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_USERNAME}`}
                external
              >
                View on Twitter
              </ButtonLink>
            </Center>
          </Section>
        </Container>
      </Stack>
    </LayoutWithHero>
  );
};

const Blog = () => {
  const { data, error } = useMicroCMSQuery<Blog>("blog", 6, {
    orders: "-publishedAt",
  });

  if (error) {
    return null;
  }

  if (!data) {
    return <CenterLoader />;
  }

  return (
    <Stack spacing="xl">
      <Stack spacing="xl">
        {data.map((value, index) => (
          <BlogCard key={index} {...blogCardFromMicroCMS(value)} />
        ))}
      </Stack>
      <Center>
        <ButtonLink href="/portfolio">View All</ButtonLink>
      </Center>
    </Stack>
  );
};

const Portfolio = () => {
  const { data, error } = useMicroCMSQuery<Portfolio>("portfolio", 6, {
    orders: "-priority",
  });

  if (error) {
    return null;
  }

  if (!data) {
    return <CenterLoader />;
  }

  return (
    <Stack spacing="xl">
      <PortfolioCard.List>
        {data.map((value, index) => (
          <PortfolioCard key={index} {...portfolioCardFromMicroCMS(value)} />
        ))}
      </PortfolioCard.List>
      <Center>
        <ButtonLink href="/portfolio">View All</ButtonLink>
      </Center>
    </Stack>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const timeline = await fetchTimelineByUsername(
    process.env.NEXT_PUBLIC_TWITTER_USERNAME
  );
  const repositories = await fetchRepositories(process.env.GITHUB_USERNAME);

  return {
    props: {
      twitter: {
        timeline: timeline.map((value) => ({
          id: value.id,
          name: value.username,
          screenName: value.name,
          icon: value.profile_image_url,
          source: value.html,
          date: dayjs(value.created_at).format("M月D日"),
        })),
      },
      github: {
        repositories: repositories.user.repositories.nodes.map((repo) => {
          const languages = repo.languages.edges
            .map((value) => {
              return {
                name: value.node.name,
                color: value.node.color,
                value: value.size / repo.languages.totalSize,
              };
            })
            .filter((value) => {
              return value.value > 0.2;
            })
            .sort((a, b) => {
              return b!.value - a!.value;
            });
          const sum = languages.reduce(
            (prev, current) => prev + current.value,
            0
          );

          if (sum < 1) {
            languages.push({ name: "Other", color: "#EDEDED", value: 1 - sum });
          }

          return {
            name: repo.name,
            description: repo.description,
            stars: repo.stargazerCount,
            forks: repo.forkCount,
            url: repo.url,
            languages,
          };
        }),
      },
    },
    revalidate: 60,
  };
};

export default Home;
