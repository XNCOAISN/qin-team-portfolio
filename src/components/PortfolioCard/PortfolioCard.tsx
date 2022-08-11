import { Image, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

import { PortfolioCardList } from "./List";

type PortfolioCardComponents = {
  List: typeof PortfolioCardList;
};

type PortfolioCardProps = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  thumbnail: string;
};

export const PortfolioCard: FC<PortfolioCardProps> & PortfolioCardComponents = (
  props
) => {
  const { title, description, startDate, endDate, thumbnail } = props;

  return (
    <article>
      <Stack>
        <Image src={thumbnail} alt="" />
        <Stack spacing={8}>
          <Title order={3}>{title}</Title>
          <Text weight={500} lineClamp={4}>
            {description}
          </Text>
          <Text size="xs" weight={700} color="dimmed">
            {startDate} - {endDate}
          </Text>
        </Stack>
      </Stack>
    </article>
  );
};

PortfolioCard.List = PortfolioCardList;
