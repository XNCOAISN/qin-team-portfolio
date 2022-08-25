import { microcms, QueryOptions } from "src/lib/microcms";
import useSWRInfinite from "swr/infinite";

type Key = {
  endpoint: string;
  index: number;
};

export const useMicroCMSInfiniteQuery = <T>(
  endpoint: string,
  limit: number,
  options?: QueryOptions
) => {
  const getKey = (index: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) {
      return null; // reached the end
    }
    return { endpoint, index };
  };

  const fetcher = async (key: Key) => {
    const { endpoint, index } = key;
    const { filters, orders } = options ?? {};

    const res = await microcms.get({
      endpoint,
      queries: {
        limit,
        offset: limit * index,
        filters,
        orders,
      },
    });

    return res.contents as T[];
  };

  const { data, error, size, setSize } = useSWRInfinite<T[]>(getKey, fetcher);

  const loadMore = () => {
    setSize(size + 1);
  };

  const items = data?.flat() ?? [];
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || !!(data && data[data.length - 1]?.length < limit);

  return { items, error, loadMore, isReachingEnd, isEmpty };
};
