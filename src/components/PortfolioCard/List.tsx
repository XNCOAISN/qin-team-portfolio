import { Box, BoxProps, createStyles } from "@mantine/core";
import { FC, ReactNode } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    display: "grid",
    gap: theme.spacing.xl,
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
}));

type PortfolioCardListProps = BoxProps & {
  children?: ReactNode;
};

export const PortfolioCardList: FC<PortfolioCardListProps> = (props) => {
  const { children, className, ...others } = props;
  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.root, className)} {...others}>
      {children}
    </Box>
  );
};
