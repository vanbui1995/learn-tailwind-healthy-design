export interface IRecommendedItem {
    id: string;
    date: Date;
    image: string;
    title: string;
    tags: string;
    meal?: string;
}


export interface IRecommendedFactor {
    title: string;
    shortTitle: string;
}

export interface IMealItem {
    name: string;
    icon: string;
}

export interface ReportSet {
  label: string;
  data: number[];
  borderColor: string;
  pointBackgroundColor: string;
}

export interface IBasicReport {
  id: string;
  progress: number;
  date: Date;
  excerciseDatasets: ReportSet[];
  basisDatasets: ReportSet[];
}



export interface IDiaryItem {
  id: string;
  date: Date;
  title: string;
}


export interface IRecordFactor {
  name: string;
  explain: string;
}

export interface IExcercise {
  id: string;
  name: string;
  durationInMinute: number;
  kcal: number;
}
