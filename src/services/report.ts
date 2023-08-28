import { LABEL_CHART } from '@/enums/health';
import { IBasicReport } from '@/types/health';
import { v4 as uuidv4 } from 'uuid';



const randomInt = (input: { min: number; max: number }): number => {
  const { min, max } = input;
  return Math.floor(Math.random() * (max - min) + min);
};

export const getMyReportAPI = (): Promise<IBasicReport> => {
  // This is mock data, in the real world, we will make the api call right here
  return Promise.resolve({
    id: uuidv4(),
    date: new Date(),
    progress: 75,
    excerciseDatasets: [
      {
        label: 'Dataset 1',
        data: LABEL_CHART.map(() => randomInt({ min: -1000, max: 1000 })),
        borderColor: '#FFCC21',
        pointBackgroundColor: '#FFCC21',
      },
      {
        label: 'Dataset 2',
        data: LABEL_CHART.map(() => randomInt({ min: -1000, max: 1000 })),
        borderColor: '#8FE9D0',
        pointBackgroundColor: '#8FE9D0',
      },
    ],
    basisDatasets: [
      {
        label: 'Dataset 1',
        data: LABEL_CHART.map(() => randomInt({ min: -1000, max: 1000 })),
        borderColor: '#FFCC21',
        pointBackgroundColor: '#FFCC21',
      },
      {
        label: 'Dataset 2',
        data: LABEL_CHART.map(() => randomInt({ min: -1000, max: 1000 })),
        borderColor: '#8FE9D0',
        pointBackgroundColor: '#8FE9D0',
      },
    ],
  });
};
