import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DOUGHNUT_OPTIONS } from '@/enums/chart';

ChartJS.register(ArcElement, Tooltip, Legend);

export const getChartData = (percent: number) => ({
  datasets: [
    {
      label: '# of Votes',
      data: [percent, 100 - percent],
      backgroundColor: ['#fff', 'transparent'],
      borderWidth: 0,
    },
  ],
});

export function DoughnutChart(props: { progress: number }) {
  return <Doughnut options={DOUGHNUT_OPTIONS} data={getChartData(props.progress)} />;
}
