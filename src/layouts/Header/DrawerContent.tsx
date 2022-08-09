import {
  ActionIcon,
  Box,
  Container,
  createStyles,
  Stack,
  Text,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { FC } from "react";
import { ComponentProps } from "react";
import { X } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.pink[6],
    width: "100%",
    height: "100vh",
    color: theme.white,
  },
  head: {
    height: 65,
    display: "flex",
    alignItems: "center",
  },
}));

type DrawerContentProps = {
  menu: {
    label: string;
    href: string;
  }[];
  onClose?: ComponentProps<"button">["onClick"];
};

export const DrawerContent: FC<DrawerContentProps> = (props) => {
  const { menu, onClose } = props;
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.head}>
          <ActionIcon size="lg" onClick={onClose}>
            <X color="white" />
          </ActionIcon>
        </Box>
        <nav>
          <Stack px="xs" py="xl">
            {menu.map((value, index) => {
              return (
                <Text
                  key={index}
                  component={NextLink}
                  href={value.href}
                  size={28}
                  weight={700}
                >
                  {value.label}
                </Text>
              );
            })}
          </Stack>
        </nav>
      </Container>
    </Box>
  );
};
