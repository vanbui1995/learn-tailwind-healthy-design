import React, { HTMLAttributes, LegacyRef, RefObject } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useInfiniteQuery } from '@tanstack/react-query';
import * as dayjs from 'dayjs';
import ExcerciseItem, { IExcercise } from '../excercise-item/excercise-item';
import { getExcercisesAPI } from '@/services';

const MyExcercise = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['excercise-item'],
    queryFn: getExcercisesAPI,
    getNextPageParam: (lastPage, pages) => lastPage.pageParam + 1,
  });

  const excercises = React.useMemo(() => {
    return (
      data?.pages.reduce((current: IExcercise[], page) => {
        return [...current, ...page.data];
      }, []) || []
    );
  }, [data]);

  const handleLoadMore = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const refScroll = React.useRef<React.LegacyRef<Scrollbars>>();
  return (
    <div className={'w-full h-[264px] p-[1rem] bg-dark600 flex flex-col mt-[56px]'}>
      <p className={'uppercase text-white flex items-center'}>
        <span className={'inline-block text-[15px] mr-[1rem] w-[80px]'}>My excercise</span>
        <span className={'text-[22px]'}>{dayjs().format('YYYY.MM.DD')}</span>
      </p>
      <Scrollbars
        ref={refScroll as React.LegacyRef<Scrollbars>}
        onScrollStop={() => {
          const container = (refScroll?.current as unknown as { view: HTMLDivElement }).view as HTMLDivElement;
          if (container && container.clientHeight + container.scrollTop >= container.scrollHeight - 30) {
            handleLoadMore();
          }
        }}
        className="full-w"
      >
        <div className="mt-[4px] w-full h-[192px] grid grid-cols-2 gap-x-[40px] pr-[30px] max-md:grid-cols-1">
          {excercises.map((item) => (
            <ExcerciseItem key={item.id} excercise={item} />
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};

export default MyExcercise;
