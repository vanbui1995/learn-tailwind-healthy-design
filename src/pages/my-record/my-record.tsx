import React, { HTMLAttributes } from 'react';
import RercordFactorItem from './record-factor/record-factor';
import { getDiariesAPI } from '@/services';
import { useInfiniteQuery } from '@tanstack/react-query';
import DiaryItem from './diary-item/diary-item';
import RecordChart from './record-chart/record-chart';
import MyExcercise from './my-excercise/my-excercise';
import { IDiaryItem } from '@/types/health';
import { ALL_RECORD_FACTORS } from '@/enums/health';

const MyRecordPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['record-item'],
    queryFn: getDiariesAPI,
    getNextPageParam: (lastPage, pages) => (lastPage.pageParam !== 5 ? lastPage.pageParam + 1 : undefined), // Mock max page number is 5
  });

  const handleLoadMore = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      fetchNextPage();
    },
    [fetchNextPage],
  );

  const diaries = React.useMemo(() => {
    return (
      data?.pages.reduce((current: IDiaryItem[], page) => {
        return [...current, ...page.data];
      }, []) || []
    );
  }, [data]);

  return (
    <div className="flex-1 max-w-[960px] mx-auto my-0">
      <div className="flex flex-1 gap-[48px] mt-[56px] max-lg:gap-[24px] max-lg:flex-col max-md:mt-[24px]">
        {ALL_RECORD_FACTORS.map((item) => (
          <RercordFactorItem factor={item} key={item.name} />
        ))}
      </div>
      <RecordChart />
      <MyExcercise />
      <section className="max-lg:p-[12px]">
        <span className="text-[22px] leading-[27px] h-[32px] flex items-center mt-[56px] max-md:mt-[10px]">MY DIARY</span>
        <div className="flex flex-wrap gap-[12px] ">
          {diaries.map((item) => (
            <DiaryItem key={item.id} diary={item} />
          ))}
          <div className="min-w-[231px] w-[25%] max-md:w-1/3 flex-1  px-[16px]" />
          <div className="min-w-[231px] w-[25%] max-md:w-1/3 flex-1  px-[16px]" />
          <div className="min-w-[231px] w-[25%] max-md:w-1/3 flex-1  px-[16px]" />
        </div>
      </section>

      <div className="flex mt-[26px] mb-[56px] justify-center max-md:mb-[24px]">
        {hasNextPage && (
          <button
            disabled={isFetchingNextPage || isFetching}
            onClick={handleLoadMore}
            className="btn w-[296px]"
          >
            自分の日記をもっと見る
          </button>
        )}
      </div>
    </div>
  );
};

export default MyRecordPage;
