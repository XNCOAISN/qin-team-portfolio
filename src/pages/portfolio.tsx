import type { NextPage } from "next";
import {
  PortfolioCard,
  portfolioCardFromMicroCMS,
} from "src/components/PortfolioCard";
import { Section } from "src/components/Section";
import { Layout } from "src/layouts";
import { MicroCMSInfiniteScroll } from "src/lib/microcms";
import { Portfolio } from "src/lib/microcms";

const Portfolio: NextPage = () => {
  return (
    <Layout>
      <Section title="Portfolio" mt={40}>
        <MicroCMSInfiniteScroll
          endpoint="portfolio"
          limit={6}
          options={{
            orders: "-priority",
          }}
          render={(items: Portfolio[]) => (
            <PortfolioCard.List>
              {items.map((item, index) => (
                <PortfolioCard
                  key={index}
                  {...portfolioCardFromMicroCMS(item)}
                />
              ))}
            </PortfolioCard.List>
          )}
        />
      </Section>
    </Layout>
  );
};

export default Portfolio;
