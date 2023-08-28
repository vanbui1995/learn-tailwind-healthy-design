import React from 'react';

import { IRecommendedFactor, IMealItem, IRecordFactor } from '@/types/health';

export const ALL_RECOMMENDED_FACTORS: IRecommendedFactor[] = [
  {
    title: 'RECOMMENDED COLUMN',
    shortTitle: 'オススメ',
  },
  {
    title: 'RECOMMENDED DIET',
    shortTitle: 'ダイエット',
  },
  {
    title: 'RECOMMENDED BEAUTY',
    shortTitle: '美容',
  },
  {
    title: 'RECOMMENDED HEALTH',
    shortTitle: '健康',
  },
];

export const MEAL_BUTTONS: Array<IMealItem> = [
  {
    name: 'Morning',
    icon: '/image/icons/icon_meal.svg',
  },
  {
    name: 'Lunch',
    icon: '/image/icons/icon_meal.svg',
  },
  {
    name: 'Dinner',
    icon: '/image/icons/icon_meal.svg',
  },
  {
    name: 'Snack',
    icon: '/image/icons/icon-snack.svg',
  },
];

export const ALL_RECORD_FACTORS: IRecordFactor[] = [
  {
    name: 'BODY RECORD',
    explain: '自分のカラダの記録',
  },
  {
    name: 'MY EXERCISE',
    explain: '自分の運動の記録',
  },
  {
    name: 'MY DIARY',
    explain: '自分の日記',
  },
];

export const LABEL_CHART = [
  '6 月',
  '7 月',
  '8 月',
  '9 月',
  '10 月',
  '11 月',
  '12 月',
  '1 月',
  '2 月',
  '3 月',
  '4 月',
  '5 月',
];

export const RECORD_CHART_FACTORS = [
  { name: '日', value: 1 },
  { name: '週', value: 2 },
  { name: '月', value: 3 },
  { name: '月', value: 4 },
];
