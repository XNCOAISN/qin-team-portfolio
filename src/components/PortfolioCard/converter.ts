import dayjs from "dayjs";
import { Portfolio } from "src/lib/microcms";

import { PortfolioCardProps } from "./PortfolioCard";

export const portfolioCardFromMicroCMS = (
  portfolio: Portfolio
): PortfolioCardProps => {
  const { title, description, thumbnail, startDate, endDate } = portfolio;
  return {
    title,
    description,
    thumbnail: thumbnail.url,
    startDate: dayjs(startDate).format("YYYY.MM"),
    endDate: dayjs(endDate).format("YYYY.MM"),
  };
};
