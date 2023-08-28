export const PROGRESS_CHART_OPTIONS = {
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
      color: '#2e2e2e',
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

export const RECORD_CHART_OPTIONS = {
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
      color: '#2e2e2e',
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

export const DOUGHNUT_OPTIONS = {
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
