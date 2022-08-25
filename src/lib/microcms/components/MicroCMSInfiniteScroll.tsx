import { FC, ReactNode, useEffect, useRef } from "react";
import { CenterLoader } from "src/components/CenterLoader";

import { useIntersection, useMicroCMSInfiniteQuery } from "../hooks";
import { QueryOptions } from "../types";

export type MicroCMSInfiniteScrollProps = {
  endpoint: string;
  limit: number;
  options?: QueryOptions;
  // eslint-disable-next-line unused-imports/no-unused-vars
  render: (items: any) => ReactNode;
};

export const MicroCMSInfiniteScroll: FC<MicroCMSInfiniteScrollProps> = (
  props
) => {
  const { endpoint, limit, options, render } = props;

  const ref = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(ref);

  const { items, isReachingEnd, loadMore } = useMicroCMSInfiniteQuery<any>(
    endpoint,
    limit,
    options
  );

  useEffect(() => {
    if (intersection && !isReachingEnd) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);

  return (
    <div>
      {render(items)}
      {!isReachingEnd ? (
        <div ref={ref}>
          <CenterLoader />
        </div>
      ) : null}
    </div>
  );
};
