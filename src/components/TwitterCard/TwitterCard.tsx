import {
  Anchor,
  Avatar,
  Box,
  Group,
  Stack,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { FC } from "react";

import classes from "./TwitterCard.module.css";

export type TwitterCardProps = {
  id: string;
  name: string;
  screenName: string;
  source: string;
  icon: string;
  date: string;
};

export const TwitterCard: FC<TwitterCardProps> = (props) => {
  const { id, name, screenName, source, icon, date } = props;

  return (
    <Box
      component="article"
      className={classes.root}
      sx={{ position: "relative" }}
    >
      <Anchor
        href={`https://twitter.com/${name}/status/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      ></Anchor>
      <Group
        noWrap
        align="flex-start"
        style={{
          position: "relative",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <Avatar src={icon} radius="xl" />

        <Stack spacing={4}>
          <Group sx={{ rowGap: 0 }}>
            <Anchor
              href={`https://twitter.com/${name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text weight={700}>{screenName}</Text>
            </Anchor>
            <Group spacing={0}>
              <Anchor
                href={`https://twitter.com/${name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text size="xs" color="dimmed" weight={700}>
                  @{name}
                </Text>
              </Anchor>
              <Text size="xs" color="dimmed" weight={700}>
                {` ・ ${date}`}
              </Text>
            </Group>
          </Group>

          <TypographyStylesProvider>
            <div
              style={{
                whiteSpace: "pre-wrap",
              }}
              dangerouslySetInnerHTML={{ __html: source }}
            />
          </TypographyStylesProvider>
        </Stack>
      </Group>
    </Box>
  );
};
