export const ROUTE_PATH = {
  MY_PAGE: '/',
  MY_RECORD: '/my-record', //login
  COLUMN: '/column',
};

export interface IHeaderMenu {
  path: string;
  icon?: string;
  name: string;
  badge?: number;
}

export const HEADER_MENUS: IHeaderMenu[] = [
  {
    path: '#3',
    icon: '/image/icons/share.svg',
    name: 'Share',
  }
];

export const MENU_BAR_ITEMS: IHeaderMenu[] = [
  // { path: '#1', name: 'Welcome abc@gmail.com' },
  { path: '#login', name: 'Login' },
  { path: '#register', name: 'Register' },
  // { path: '#logout', name: 'Logout' },
];
export const LOGGED_MENU_BAR_ITEMS: IHeaderMenu[] = [
  // { path: '#login', name: 'Login' },
  // { path: '#register', name: 'Register' },
  { path: '#logout', name: 'Logout' },
];
