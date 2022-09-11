import {
  Avatar,
  Group,
  Stack,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { FC } from "react";

export type TwitterCardProps = {
  name: string;
  screenName: string;
  source: string;
  icon: string;
  date: string;
};

export const TwitterCard: FC<TwitterCardProps> = (props) => {
  const { name, screenName, source, icon, date } = props;

  return (
    <article>
      <Group noWrap align="flex-start">
        <Avatar src={icon} radius="xl" />

        <Stack spacing={4}>
          <Group sx={{ rowGap: 0 }}>
            <Text weight={700}>{screenName}</Text>
            <Text size="xs" color="dimmed" weight={700}>
              @{name} ・ {date}
            </Text>
          </Group>

          <TypographyStylesProvider>
            {/* <div dangerouslySetInnerHTML={{ __html: source }} /> */}
            <pre
              style={{
                margin: 0,
                padding: 0,
                background: "none",
                whiteSpace: "pre-wrap",
              }}
            >
              {source}
            </pre>
          </TypographyStylesProvider>
        </Stack>
      </Group>
    </article>
  );
};
