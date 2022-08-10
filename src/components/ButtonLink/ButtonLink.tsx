import type { ButtonProps as MantineButtonProps } from "@mantine/core";
import { Button as MantineButton } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { FC } from "react";

export type ButtonLinkProps = Omit<MantineButtonProps, "color"> & {
  href: string;
};

export const ButtonLink: FC<ButtonLinkProps> = (props) => {
  const { ...others } = props;

  return (
    <MantineButton
      component={NextLink}
      sx={(theme) => ({
        color: theme.colorScheme === "dark" ? "black" : "white",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : theme.colors.gray[9],
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[2]
              : theme.colors.gray[7],
        },
      })}
      {...others}
    />
  );
};
