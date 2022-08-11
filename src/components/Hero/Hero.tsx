import {
  Container,
  ContainerProps,
  createStyles,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { FC } from "react";
import { FacebookIcon, RSSIcon, TwitterIcon } from "src/components/Icon";

const useStyles = createStyles((theme) => ({
  container: {
    height: 248,
    color: theme.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: `0px ${theme.spacing.md}px`,
    gap: 30,
    borderImageSource: `linear-gradient(${theme.colors.pink[6]}, ${theme.colors.pink[6]})`,
    borderImageSlice: "0 fill",
    borderImageOutset: "0 100vw 0 100vw",

    [theme.fn.largerThan("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },

  title: {
    fontSize: 28,

    [theme.fn.largerThan("sm")]: {
      fontSize: 36,
    },
  },
  description: {
    fontSize: theme.fontSizes.md,
  },
}));

const LINKS = [
  { icon: <TwitterIcon />, href: "#" },
  { icon: <FacebookIcon />, href: "#" },
  { icon: <RSSIcon />, href: "#" },
];

type HeroProps = ContainerProps;

export const Hero: FC<HeroProps> = (props) => {
  const { className, ...others } = props;
  const { classes, cx } = useStyles();

  return (
    <Container className={cx(classes.container, className)} {...others}>
      <Stack spacing={4}>
        <Title className={classes.title} order={1}>
          Shimabu IT University
        </Title>
        <Text className={classes.description} weight={700}>
          しまぶーのポートフォリオのためのページです
        </Text>
      </Stack>
      <Group spacing="sm">
        {LINKS.map((value, index) => (
          <a key={index} href={value.href} style={{ display: "flex" }}>
            {value.icon}
          </a>
        ))}
      </Group>
    </Container>
  );
};
