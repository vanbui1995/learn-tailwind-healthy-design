export const ROUTE_PATH = {
  MY_PAGE: '/',
  MY_RECORD: '/my-record', //login
  COLUMN: '/column',
};

export interface IHeaderMenu {
  path: string;
  icon?: string;
  name: string;
}

export const HEADER_MENUS: IHeaderMenu[] = [
  {
    path: ROUTE_PATH.MY_PAGE,
    icon: '/image/icons/icon_memo.svg',
    name: '自分の記録',
  },
  {
    path: ROUTE_PATH.MY_RECORD,
    icon: '/image/icons/icon_challenge.svg',
    name: 'チャレンジ',
  },
  {
    path: ROUTE_PATH.COLUMN,
    icon: '/image/icons/icon_info.svg',
    name: 'お知らせ',
  },
];

export const MENU_BAR_ITEMS: IHeaderMenu[] = [
  { path: ROUTE_PATH.MY_RECORD, name: '自分の記録' },
  { path: '#1', name: '体重グラフ' },
  { path: '#2', name: '目標' },
  { path: '#3', name: 'コラム一覧' },
  { path: '#4', name: '自分の記録' },
  { path: ROUTE_PATH.COLUMN, name: '設定' },
];
