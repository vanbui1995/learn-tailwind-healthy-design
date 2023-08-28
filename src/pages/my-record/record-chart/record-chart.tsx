import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useMyReport } from '@/pages/my-page/sections/progress-chart/progress-chart';
import { useQueryClient } from '@tanstack/react-query';
import { RECORD_CHART_OPTIONS } from '@/enums/chart';
import { LABEL_CHART, RECORD_CHART_FACTORS } from '@/enums/health';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generalBtnClass =
  'border-0 py-[2px] cursor-pointer rounded-[11px] w-[56px] text-primary300 transition-all hover:bg-primary400 hover:text-white';
const activeBtnClass = `${generalBtnClass} text-white bg-primary300`;

const RecordChart = () => {
  const [type, setType] = useState(1);
  const { data, isLoading } = useMyReport();
  const queryClient = useQueryClient();
  const dataChart = useMemo<ChartData<'line', number[], string>>(() => {
    return {
      labels: LABEL_CHART,
      datasets: data?.excerciseDatasets || [],
    };
  }, [data]);
  return (
    <div className={'w-full h-[340px] p-[1rem] bg-dark600 flex flex-col mt-[56px] max-md:mt-[24px]'}>
      <p className={'uppercase text-white flex items-center'}>
        <span className={'inline-block text-[15px] mr-[1rem] w-[80px]'}>Body record</span>
        <span className={'text-[22px]'}>{dayjs().format('YYYY.MM.DD')}</span>
      </p>
      <div className={'relative flex-1'}>
        <Line
          options={RECORD_CHART_OPTIONS}
          data={dataChart}
          plugins={[
            {
              id: 'customCanvasBackgroundColor',
              beforeDraw: (chart, args, options) => {
                const { ctx } = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color || '#99ffff';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
              },
            },
          ]}
        />
      </div>
      <div className={'flex pt-[4px] gap-[1rem] flex-wrap'}>
        {RECORD_CHART_FACTORS.map((i) => (
          <button
            onClick={() => {
              setType(i.value);
              queryClient.invalidateQueries(['my-report']);
            }}
            className={type === i.value ? activeBtnClass : generalBtnClass}
            key={i.value}
          >
            {i.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecordChart;
