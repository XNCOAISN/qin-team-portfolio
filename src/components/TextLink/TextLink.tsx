import { Text, TextProps } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { FC } from "react";

type TextLinkProps = Omit<TextProps, "variant"> & {
  href: string;
};

export const TextLink: FC<TextLinkProps> = (props) => {
  const { href, ...others } = props;

  return (
    <Text
      component={NextLink}
      href={href}
      sx={(theme) => ({
        "&:hover": {
          opacity: theme.colorScheme === "dark" ? 0.45 : 0.65,
        },
      })}
      {...others}
    />
  );
};
