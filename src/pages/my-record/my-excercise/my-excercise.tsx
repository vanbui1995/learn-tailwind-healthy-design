import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs'
import ExcerciseItem from '../excercise-item/excercise-item';
import { getExcercisesAPI } from '@/services';
import { IExcercise } from '@/types/health';

const MyExcercise = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['excercise-item'],
    queryFn: getExcercisesAPI,
    getNextPageParam: (lastPage, pages) => (lastPage.pageParam !== 5 ? lastPage.pageParam + 1 : undefined), // Mock max page number is 5
  });

  const excercises = React.useMemo(() => {
    return (
      data?.pages.reduce((current: IExcercise[], page) => {
        return [...current, ...page.data];
      }, []) || []
    );
  }, [data]);

  const handleLoadMore = React.useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  const refScroll = React.useRef<HTMLDivElement>(null);
  return (
    <div className={'scrollable-area w-full h-[264px] p-[1rem] bg-dark600 flex flex-col mt-[56px] max-md:mt-[24px]'}>
      <p className={'uppercase text-white flex items-center'}>
        <span className={'inline-block text-[15px] mr-[1rem] w-[80px]'}>My excercise</span>
        <span className={'text-[22px]'}>{dayjs().format('YYYY.MM.DD')}</span>
      </p>
      <div
        ref={refScroll}
        className="customized-scrollbar h-[192px] overflow-y-scroll"
        onScroll={() => {
          if (refScroll.current) {
            if (refScroll.current.scrollTop + refScroll.current.offsetHeight > refScroll.current.scrollHeight - 20) {
              handleLoadMore();
            }
          }
        }}
      >
        <div className="mt-[4px] w-full h-[192px] grid grid-cols-2 gap-x-[40px] pr-[30px] max-md:grid-cols-1">
          {excercises.map((item) => (
            <ExcerciseItem key={item.id} excercise={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyExcercise;
