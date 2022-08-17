import { Center, Container, createStyles, Stack } from "@mantine/core";
import type { NextPage } from "next";
import { BlogCard } from "src/components/BlogCard";
import { ButtonLink } from "src/components/ButtonLink";
import { GitHubCard } from "src/components/GitHubCard";
import { PortfolioCard } from "src/components/PortfolioCard";
import { Section } from "src/components/Section";
import { TwitterCard } from "src/components/TwitterCard";
import { LayoutWithHero } from "src/layouts/LayoutWithHero";

const BLOG_LIST = Array(4).fill({
  id: "blogId",
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

const TWITTER_LIST = Array(3).fill({
  name: "shimabu_it",
  screenName: "しまぶーのIT大学",
  source:
    '<p>📣 新サービス「Noway Form」をリリースしました！</p><p>Noway Formは、Notionのデータベースをもとにフォームを作成できるサービスです。これまでGoogle FormsでやっていたことがNotionだけで完結します✌✨</p><p>試しに使っていただけると幸いです😊</p><p><a href="https://www.noway-form.com/ja" rel="nofollow">https://www.noway-form.com/ja</a></p>',
  icon: "https://picsum.photos/100",
  date: "5月25日",
});

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

const Home: NextPage = () => {
  const { classes } = useStyles();

  return (
    <LayoutWithHero responsive={false}>
      <Stack className={classes.contents}>
        <Section title="Blog">
          <Stack spacing="xl">
            {BLOG_LIST.map((value, index) => (
              <BlogCard
                key={index}
                id={value.id}
                title={value.title}
                description={value.description}
                date={value.date}
              />
            ))}
            <Center>
              <ButtonLink href="/blog">View All</ButtonLink>
            </Center>
          </Stack>
        </Section>

        <Section title="Portfolio">
          <Stack spacing="xl">
            <PortfolioCard.List>
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
            </PortfolioCard.List>
            <Center>
              <ButtonLink href="/portfolio">View All</ButtonLink>
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
                <ButtonLink href="https://github.com/lightsound" external>
                  View on GitHub
                </ButtonLink>
              </Center>
            </Stack>
          </Section>

          <Section title="Twitter">
            <Stack spacing="xl">
              {TWITTER_LIST.map((value, index) => (
                <TwitterCard
                  key={index}
                  icon={value.icon}
                  name={value.name}
                  screenName={value.screenName}
                  date={value.date}
                  source={value.source}
                />
              ))}
            </Stack>
            <Center>
              <ButtonLink href="https://twitter.com/shimabu_it" external>
                View on Twitter
              </ButtonLink>
            </Center>
          </Section>
        </Container>
      </Stack>
    </LayoutWithHero>
  );
};

export default Home;
