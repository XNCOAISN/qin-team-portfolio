import { microcms, QueryOptions } from "src/lib/microcms";
import useSWR from "swr";

type Key = {
  endpoint: string;
  limit: number;
};

export const useMicroCMSQuery = <T>(
  endpoint: string,
  limit: number,
  options?: QueryOptions
) => {
  const getKey = () => {
    return { endpoint, limit };
  };

  const fetcher = async (key: Key) => {
    const { endpoint } = key;
    const { filters, orders } = options ?? {};

    const res = await microcms.get({
      endpoint,
      queries: {
        limit,
        filters,
        orders,
      },
    });

    return res.contents as T[];
  };

  return useSWR<T[]>(getKey, fetcher);
};
