import type { ButtonProps as MantineButtonProps } from "@mantine/core";
import { Button as MantineButton } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { FC } from "react";

export type ButtonLinkProps = Omit<MantineButtonProps, "color"> & {
  href: string;
  external?: boolean;
};

export const ButtonLink: FC<ButtonLinkProps> = (props) => {
  const { external = false, ...others } = props;

  const externalProps = external
    ? {
        rel: "noopener noreferrer",
        target: "_blank",
      }
    : {};

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
      {...externalProps}
      {...others}
    />
  );
};
