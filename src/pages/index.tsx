import { Center, Container, createStyles, Stack } from "@mantine/core";
import dayjs from "dayjs";
import type { GetStaticProps, NextPage } from "next";
import { BlogCard, blogCardFromMicroCMS } from "src/components/BlogCard";
import { ButtonLink } from "src/components/ButtonLink";
import { CenterLoader } from "src/components/CenterLoader";
import { GitHubCard } from "src/components/GitHubCard";
import {
  PortfolioCard,
  portfolioCardFromMicroCMS,
} from "src/components/PortfolioCard";
import { Section } from "src/components/Section";
import { TwitterCard, TwitterCardProps } from "src/components/TwitterCard";
import { LayoutWithHero } from "src/layouts/LayoutWithHero";
import { Blog, useMicroCMSQuery } from "src/lib/microcms";
import { Portfolio } from "src/lib/microcms";
import { fetchTimelineByUsername } from "src/lib/twitter/fetch-timeline";

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

// const TWITTER_LIST = Array(3).fill({
//   name: "shimabu_it",
//   screenName: "しまぶーのIT大学",
//   source:
//     '<p>📣 新サービス「Noway Form」をリリースしました！</p><p>Noway Formは、Notionのデータベースをもとにフォームを作成できるサービスです。これまでGoogle FormsでやっていたことがNotionだけで完結します✌✨</p><p>試しに使っていただけると幸いです😊</p><p><a href="https://www.noway-form.com/ja" rel="nofollow">https://www.noway-form.com/ja</a></p>',
//   icon: "https://picsum.photos/100",
//   date: "5月25日",
// });

type Props = {
  twitter: {
    timeline: TwitterCardProps[];
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
  const { twitter } = props;
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
                <ButtonLink href="https://github.com/lightsound" external>
                  View on GitHub
                </ButtonLink>
              </Center>
            </Stack>
          </Section>

          <Section title="Twitter">
            <Stack spacing="xl">
              {twitter.timeline.map((value, index) => (
                <TwitterCard
                  key={index}
                  icon={value.icon}
                  name={value.name}
                  screenName={value.screenName}
                  date={value.date}
                  source={value.source}
                />
              ))}
              <Center>
                <ButtonLink
                  href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_USERNAME}`}
                  external
                >
                  View on Twitter
                </ButtonLink>
              </Center>
            </Stack>
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
    process.env.NEXT_PUBLIC_TWITTER_USERNAME!
  );

  return {
    props: {
      twitter: {
        timeline: timeline.map((value) => ({
          name: value.username,
          screenName: value.name,
          icon: value.profile_image_url,
          source: value.text,
          date: dayjs(value.created_at).format("M月D日"),
        })),
      },
    },
    revalidate: 60,
  };
};

export default Home;
