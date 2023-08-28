import { memo, useState } from 'react';
import Chart from '@/pages/my-page/sections/progress-chart/chart';
import { DoughnutChart } from './doughchart';
import { useQuery } from '@tanstack/react-query';
import { getMyReportAPI } from '@/services';
import { IBasicReport } from '@/types/health';

export const useMyReport = () =>
  useQuery<IBasicReport | undefined>({
    queryKey: ['my-report'],
    queryFn: getMyReportAPI,
  });

const ProgressChart = () => {
  const { data } = useMyReport();
  return (
    <div className={'flex h-[312px] max-md:h-[unset] max-md:flex-col'}>
      <div
        className={'text-light-Text w-[42%] max-md:w-full relative flex items-center justify-center max-md:h-[280px]'}
      >
        <div
          className={
            "absolute top-0 left-0 w-full h-full bg-primary400 bg-[url('/image/picture/d01.jpg')] bg-cover bg-center"
          }
        />
        <div className="absolute h-[181px] w-[181px]">
          <div className="relative h-full w-full">
            <DoughnutChart progress={data?.progress || 0} />
          </div>
        </div>

        <span className={'absolute text-[18px] text-light'}>
          05/21 <span className={'text-[25px]'}>{data?.progress || 0}%</span>
        </span>
      </div>
      <div className={'w-[58%] max-md:w-full p-6 bg-dark600'}>
        <Chart dataSets={data?.basisDatasets || []} />
      </div>
    </div>
  );
};

export default memo(ProgressChart);
