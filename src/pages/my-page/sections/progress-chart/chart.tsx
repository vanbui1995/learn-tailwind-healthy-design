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
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const randomInt = (input: { min: number; max: number }): number => {
  const { min, max } = input;
  return Math.floor(Math.random() * (max - min) + min);
};

const backgroundColor = '#2e2e2e';

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: {
      grid: {
        color: '#777777',
      },
      border: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
        color: '#777777',
      },
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    customCanvasBackgroundColor: {
      color: backgroundColor,
    },
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月', '1 月', '2 月', '3 月', '4 月', '5 月'];

export const data: ChartData<'line', number[], string> = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => randomInt({ min: -1000, max: 1000 })),
      borderColor: '#FFCC21',
      pointBackgroundColor: '#FFCC21',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => randomInt({ min: -1000, max: 1000 })),
      borderColor: '#8FE9D0',
      pointBackgroundColor: '#8FE9D0',
    },
  ],
};

const Chart = () => {
  return (
    <div className={'w-full h-full relative'}>
      <Line
        options={options}
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
