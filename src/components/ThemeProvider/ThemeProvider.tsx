import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { useEffect, useState } from "react";

export type MantineThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = (props: MantineThemeProviderProps) => {
  const { children } = props;

  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    setColorScheme(preferredColorScheme);
  }, [preferredColorScheme]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          components: {
            Button: {
              defaultProps: {
                size: "md",
                radius: "xl",
              },
              styles: () => ({
                root: {
                  "&:not(:disabled):active": {
                    transform: "none",
                  },
                },
              }),
            },
            ActionIcon: {
              styles: () => ({
                root: {
                  "&:not(:disabled):active": {
                    transform: "none",
                  },
                },
              }),
            },
            Input: {
              defaultProps: {
                radius: "xs",
              },
            },
            InputWrapper: {
              styles: () => ({
                label: {
                  marginBottom: 6,
                },
                required: {
                  display: "none",
                },
              }),
            },
          },
        }}
        withNormalizeCSS
        withGlobalStyles
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
