import { Paper, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { TextLink } from "src/components/TextLink";

type BlogCardProps = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export const BlogCard: FC<BlogCardProps> = (props) => {
  const { id, title, description, date } = props;

  return (
    <article>
      <Paper>
        <Stack spacing={8}>
          <Title order={3}>
            <TextLink href={`/blog/${id}`}>{title}</TextLink>
          </Title>
          <Text weight={500} lineClamp={2}>
            {description}
          </Text>
          <Text size="xs" weight={700} color="dimmed">
            {date}
          </Text>
        </Stack>
      </Paper>
    </article>
  );
};
