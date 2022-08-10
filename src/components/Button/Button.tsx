import type { ButtonProps as MantineButtonProps } from "@mantine/core";
import { Button as MantineButton } from "@mantine/core";
import { ComponentProps, FC } from "react";

export type ButtonProps = Omit<MantineButtonProps, "color"> & {
  onClick?: ComponentProps<"button">["onClick"];
};

export const Button: FC<ButtonProps> = (props) => {
  const { ...others } = props;

  return (
    <MantineButton
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
