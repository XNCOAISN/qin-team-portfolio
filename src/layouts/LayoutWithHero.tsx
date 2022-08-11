import { createStyles } from "@mantine/core";
import { FC } from "react";
import { Hero } from "src/components/Hero";

import { Layout, LayoutProps } from "./Layout";

type LayoutWithHeroStylesParams = {
  responsive: boolean;
};

const useStyles = createStyles(
  (theme, { responsive }: LayoutWithHeroStylesParams) => ({
    hero: {
      display: responsive ? "none" : "flex",
      [theme.fn.largerThan("md")]: {
        display: "flex",
      },
    },
  })
);

type LayoutWithHeroProps = LayoutProps & {
  responsive?: boolean;
};

export const LayoutWithHero: FC<LayoutWithHeroProps> = (props) => {
  const { children, responsive = true } = props;
  const { classes } = useStyles({ responsive });

  return (
    <Layout>
      <Hero className={classes.hero} />
      {children}
    </Layout>
  );
};
