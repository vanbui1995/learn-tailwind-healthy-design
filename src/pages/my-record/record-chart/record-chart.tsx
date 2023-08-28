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
  import { useState } from 'react';

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
      },
    },
  };
  
  const labels = ['6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月', '1 月', '2 月', '3 月', '4 月', '5 月'];
  
  const data = (): ChartData<'line', number[], string> => {
    return {
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
  };
  
  const types = [
    { name: '日', value: 1 },
    { name: '週', value: 2 },
    { name: '月', value: 3 },
    { name: '月', value: 4 },
  ];
  
  const generalBtnClass =
    'border-0 py-[2px] cursor-pointer rounded-[11px] w-[56px] text-primary300 transition-all hover:bg-primary400 hover:text-white';
  const activeBtnClass = `${generalBtnClass} text-white bg-primary300`;
  
  const RecordChart = () => {
    const [type, setType] = useState(1);
    return (
      <div className={'w-full h-[340px] p-[1rem] bg-dark600 flex flex-col mt-[56px]'}>
        <p className={'uppercase text-white flex items-center'}>
          <span className={'inline-block text-[15px] mr-[1rem] w-[80px]'}>Body record</span>
          <span className={'text-[22px]'}>{dayjs().format('YYYY.MM.DD')}</span>
        </p>
        <div className={'relative flex-1'}>
          <Line
            options={options}
            data={data()}
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
          {types.map((i) => (
            <button
              onClick={() => {
                setType(i.value);
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