import { Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

type BlogCardProps = {
  title: string;
  description: string;
  date: string;
};

export const BlogCard: FC<BlogCardProps> = (props) => {
  const { title, description, date } = props;

  return (
    <article>
      <Stack spacing={8}>
        <Title order={3}>{title}</Title>
        <Text weight={500} lineClamp={2}>
          {description}
        </Text>
        <Text size="xs" weight={700} color="dimmed">
          {date}
        </Text>
      </Stack>
    </article>
  );
};
