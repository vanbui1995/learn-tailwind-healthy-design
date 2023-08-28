import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  cutout: 85,
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
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
  return <Doughnut options={options} data={getChartData(props.progress)} />;
}
