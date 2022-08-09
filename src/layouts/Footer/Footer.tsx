import { Container, createStyles, Divider, Text } from "@mantine/core";
import { ComponentProps, FC } from "react";

type FooterProps = ComponentProps<"footer">;

const useStyles = createStyles((theme) => ({
  footer: {
    margin: `0 ${theme.spacing.md}px`,
    height: 105,
  },

  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const Footer: FC<FooterProps> = (props) => {
  const { className, ...others } = props;
  const { classes, cx } = useStyles();

  return (
    <footer {...others} className={cx(classes.footer, className)}>
      <Divider />
      <Container className={classes.container}>
        <Text size={10} color="dimmed">
          © ️2022 Shimabu IT University
        </Text>
      </Container>
    </footer>
  );
};
