import { Box, createStyles, Stack } from "@mantine/core";
import type { NextPage } from "next";
import { PortfolioCard } from "src/components/PortfolioCard";
import { Section } from "src/components/Section";
import { Layout } from "src/layouts";

const PORTFOLIO_LIST = Array(6).fill({
  title: "IT KINGDOM",
  description:
    "当サロンのLPページ。React、Next.js、TypeScriptなどのモダンな技術を用いて作られています。初心者にちょうど良い難易度の制作物です。",
  startDate: "2021.10",
  endDate: "2021.12",
  thumbnail: "https://picsum.photos/400/200",
});

const useStyles = createStyles((theme) => ({
  portfolioList: {
    display: "grid",
    gap: theme.spacing.xl,
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
}));

const Portfolio: NextPage = () => {
  const { classes } = useStyles();

  return (
    <Layout>
      <Section title="Portfolio" mt={40}>
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
        </Stack>
      </Section>
    </Layout>
  );
};

export default Portfolio;
