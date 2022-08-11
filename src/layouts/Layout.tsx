import { createStyles } from "@mantine/core";
import { FC, ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

const useStyles = createStyles(() => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header: {
    position: "sticky",
    top: 0,
  },
  footer: {
    marginTop: "auto",
  },
}));

export type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;
  const { classes } = useStyles();

  return (
    <div className={classes.layout}>
      <Header className={classes.header} />
      <main>{children}</main>
      <Footer className={classes.footer} />
    </div>
  );
};
