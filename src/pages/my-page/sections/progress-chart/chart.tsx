import { PROGRESS_CHART_OPTIONS } from '@/enums/chart';
import { LABEL_CHART } from '@/enums/health';
import { ReportSet } from '@/types/health';
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
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IProps {
  dataSets: ReportSet[];
}

const Chart = (props: IProps) => {
  const { dataSets } = props;

  const data = React.useMemo<ChartData<'line', number[], string>>(() => {
    return {
      labels: LABEL_CHART,
      datasets: dataSets,
    };
  }, [dataSets]);

  return (
    <div className={'w-full h-full relative'}>
      <Line
        options={PROGRESS_CHART_OPTIONS}
        data={data}
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
  );
};

export default Chart;
