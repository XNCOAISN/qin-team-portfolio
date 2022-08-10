import { Group, Image, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

type PortfolioCardProps = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  thumbnail: string;
};

export const PortfolioCard: FC<PortfolioCardProps> = (props) => {
  const { title, description, startDate, endDate, thumbnail } = props;

  return (
    <article>
      <Stack spacing={8}>
        <Image src={thumbnail} alt="" />
        <Title order={3}>{title}</Title>
        <Text weight={500} lineClamp={4}>
          {description}
        </Text>
        <Group>
          <Text size="xs" weight={700} color="dimmed">
            {startDate}
          </Text>
          <Text>-</Text>
          <Text size="xs" weight={700} color="dimmed">
            {endDate}
          </Text>
        </Group>
      </Stack>
    </article>
  );
};
