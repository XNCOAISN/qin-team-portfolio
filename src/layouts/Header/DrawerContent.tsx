import { ActionIcon, Box, Container, createStyles, Stack } from "@mantine/core";
import { FC } from "react";
import { ComponentProps } from "react";
import { TextLink } from "src/components/TextLink";
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
  close: {
    "&:hover": {
      backgroundColor: theme.colors.pink[7],
    },
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
          <ActionIcon className={classes.close} size="lg" onClick={onClose}>
            <X color="white" />
          </ActionIcon>
        </Box>
        <nav>
          <Stack px="xs" py="xl" align="flex-start">
            {menu.map((value, index) => {
              return (
                <TextLink key={index} href={value.href} size={28} weight={700}>
                  {value.label}
                </TextLink>
              );
            })}
          </Stack>
        </nav>
      </Container>
    </Box>
  );
};
