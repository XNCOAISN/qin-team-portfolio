import { Box, Group, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { FC } from "react";
import { DotIcon } from "src/components/Icon";
import { TextLink } from "src/components/TextLink";
import { GitFork, Star } from "tabler-icons-react";

export type GitHubCardProps = {
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
  languages: Language[];
};

type Language = {
  name: string;
  color: string;
  value: number;
};

export const GitHubCard: FC<GitHubCardProps> = (props) => {
  const { name, description, stars, forks, url, languages } = props;
  const theme = useMantineTheme();

  const iconColor =
    theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6];

  return (
    <article>
      <Stack spacing={8}>
        <Title order={3}>
          <TextLink href={url} size="lg">
            {name}
          </TextLink>
        </Title>
        {description ? (
          <Text weight={500} lineClamp={1}>
            {description}
          </Text>
        ) : null}
        <Group>
          <Group spacing={4}>
            <Star size={16} color={iconColor} />
            <Text size="sm" color="dimmed" weight={700}>
              {stars}
            </Text>
          </Group>
          <Group spacing={4}>
            <GitFork size={16} color={iconColor} />
            <Text size="sm" color="dimmed" weight={700}>
              {forks}
            </Text>
          </Group>
        </Group>

        <LanguageBar languages={languages} />
        <LanguageLegens languages={languages} />
      </Stack>
    </article>
  );
};

type LanguageBarProps = {
  languages: Language[];
};

const LanguageBar: FC<LanguageBarProps> = (props) => {
  const { languages } = props;

  return (
    <Group spacing={0} sx={{ overflow: "hidden", borderRadius: 8 }} noWrap>
      {languages.map((value, index) => (
        <Box
          key={index}
          sx={{
            width: `${(value.value * 100).toFixed(1)}%`,
            backgroundColor: value.color,
            height: 8,
          }}
        ></Box>
      ))}
    </Group>
  );
};

type LanguageLegendProps = {
  languages: Language[];
};

const LanguageLegens: FC<LanguageLegendProps> = (props) => {
  const { languages } = props;

  return (
    <Group sx={{ rowGap: 0 }}>
      {languages.map((value, index) => (
        <Group key={index} spacing={6} noWrap>
          <DotIcon color={value.color} />
          <Text size="sm" weight={700}>
            {value.name}
          </Text>
          <Text size="sm" color="dimmed" weight={700}>
            {(value.value * 100).toFixed(1)}%
          </Text>
        </Group>
      ))}
    </Group>
  );
};
