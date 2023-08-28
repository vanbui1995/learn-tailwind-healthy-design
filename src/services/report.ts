import { IBasicReport } from '@/types/health';
import { v4 as uuidv4 } from 'uuid';

const BASIC_REPORT_LABEL = ['6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月', '1 月', '2 月', '3 月', '4 月', '5 月'];

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
        data: BASIC_REPORT_LABEL.map(() => randomInt({ min: -1000, max: 1000 })),
        borderColor: '#FFCC21',
        pointBackgroundColor: '#FFCC21',
      },
      {
        label: 'Dataset 2',
        data: BASIC_REPORT_LABEL.map(() => randomInt({ min: -1000, max: 1000 })),
        borderColor: '#8FE9D0',
        pointBackgroundColor: '#8FE9D0',
      },
    ],
    basisDatasets: [
      {
        label: 'Dataset 1',
        data: BASIC_REPORT_LABEL.map(() => randomInt({ min: -1000, max: 1000 })),
        borderColor: '#FFCC21',
        pointBackgroundColor: '#FFCC21',
      },
      {
        label: 'Dataset 2',
        data: BASIC_REPORT_LABEL.map(() => randomInt({ min: -1000, max: 1000 })),
        borderColor: '#8FE9D0',
        pointBackgroundColor: '#8FE9D0',
      },
    ],
  });
};
