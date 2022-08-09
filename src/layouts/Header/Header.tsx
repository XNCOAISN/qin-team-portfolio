import {
  ActionIcon,
  Container,
  createStyles,
  Drawer,
  Group,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { ComponentProps, FC, useState } from "react";
import { Menu2, Moon, Sun } from "tabler-icons-react";

import { DrawerContent } from "./DrawerContent";

const MENU = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

type HeaderProps = ComponentProps<"header">;

const useStyles = createStyles((theme) => ({
  header: {
    height: 65,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    height: "100%",
  },
  links: {
    display: "none",
    [theme.fn.largerThan("sm")]: {
      display: "flex",
    },
  },
  burger: {
    display: "flex",
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export const Header: FC<HeaderProps> = (props) => {
  const { className, ...others } = props;
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    <header {...others} className={cx(classes.header, className)}>
      <Container className={classes.container}>
        <ActionIcon
          className={classes.burger}
          size="lg"
          onClick={() => setOpened(true)}
        >
          <Menu2 />
        </ActionIcon>

        <Text component={NextLink} href="/" size="lg" weight={700}>
          Shimabu IT University
        </Text>

        <Group>
          <nav className={classes.links}>
            <Group>
              {MENU.map((value, index) => (
                <Text
                  key={index}
                  component={NextLink}
                  href={value.href}
                  size="lg"
                  weight={700}
                >
                  {value.label}
                </Text>
              ))}
            </Group>
          </nav>
          <ColorSchemeToggle />
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        size="full"
        position="top"
      >
        <DrawerContent menu={MENU} onClose={() => setOpened(false)} />
      </Drawer>
    </header>
  );
};

const ColorSchemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon
      variant="outline"
      radius="md"
      size="lg"
      onClick={() => toggleColorScheme()}
    >
      {colorScheme === "dark" ? <Sun /> : <Moon />}
    </ActionIcon>
  );
};
