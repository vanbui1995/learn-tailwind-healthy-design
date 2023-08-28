import { HEADER_MENUS, ROUTE_PATH } from '@/enums';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from './dropdown';
import HeaderMenuItem from './header-menu-iem';

const Header = () => {
  const location = useLocation();
  return (
    <div className="bg-dark500 h-[64px] text-white flex w-full justify-center">
      <div className="flex flex-1 items-center justify-between max-w-[960px]">
        <Link to={ROUTE_PATH.MY_PAGE} className="px-[12px] pt-[14px]">
          <img alt="Logo" src="/image/logo/logo.svg"></img>
        </Link>
        <div className="flex flex-1 justify-end max-md:hidden">
          {HEADER_MENUS.map((item) => (
            <HeaderMenuItem item={item} key={item.path} active={location.pathname === item.path} badge={item.badge ||0} />
          ))}
        </div>
        <div>
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
