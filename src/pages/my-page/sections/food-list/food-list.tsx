import { getRecommendItemAPI } from '@/services';
import { IRecommendedItem } from '@/types/health';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';

const FoodList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['food-item'],
    queryFn: getRecommendItemAPI,
    getNextPageParam: (lastPage, pages) => (lastPage.pageParam !== 5 ? lastPage.pageParam + 1 : undefined), // Mock max page number is 5
  });

  const handleLoadMore = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      fetchNextPage();
    },
    [fetchNextPage],
  );

  const recommendedItems = React.useMemo(() => {
    return (
      data?.pages.reduce((current: IRecommendedItem[], page) => {
        return [...current, ...page.data];
      }, []) || []
    );
  }, [data]);

  return (
    <div className={'flex max-w-[960px] items-center flex-col justify-center my-0 mx-auto'}>
      <div className="flex gap-[8px] flex-wrap max-lg:p-[8px]">
        {recommendedItems.map((item) => (
          <div
            style={{ backgroundImage: `url(${item.image})` }}
            key={item.id}
            className={
              'flex-1 min-w-[234px] w-[25%] max-md:w-1/3 h-[234px] relative bg-cover bg-center bg-secondary300'
            }
          >
            <span className={'bg-primary300 text-white text-[15px] absolute bottom-[0px] w-[120px] p-[7px]'}>
              {item.meal}
            </span>
          </div>
        ))}
        <div className={'flex-1 min-w-[234px] w-[25%] max-md:w-1/3 relative'} />
        <div className={'flex-1 min-w-[234px] w-[25%] max-md:w-1/3 relative'} />
        <div className={'flex-1 min-w-[234px] w-[25%] max-md:w-1/3 relative'} />
      </div>
      <div className="flex mt-[26px] mb-[56px] justify-center">
        {hasNextPage && (
          <button
            disabled={isFetchingNextPage || isFetching}
            onClick={handleLoadMore}
            className="btn w-[296px]"
          >
            コラムをもっと見る
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodList;
