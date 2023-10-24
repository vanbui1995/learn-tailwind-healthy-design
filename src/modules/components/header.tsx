import { HEADER_MENUS, ROUTE_PATH } from '@/enums';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import Dropdown from './dropdown';
import HeaderMenuItem from './header-menu-iem';
import { useAuth } from '../common/firebase/useAuth';
import { SharePostModal } from '@/pages/my-page';

export const Header = () => {
  const location = useLocation();
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const { currentUser } = useAuth();
  return (
    <div className="bg-purple300 h-[64px] text-white flex w-full justify-center">
      <div className="flex flex-1 items-center justify-between max-w-[960px]">
        <Link to={ROUTE_PATH.MY_PAGE} className="px-[12px]">
          <img alt="Logo" className="w-auto h-[64px]" src="/image/logo/logo.png"></img>
        </Link>
        <SharePostModal
          showModal={openShareModal}
          toggleModal={() => {
            setOpenShareModal(false);
          }}
        />
        {currentUser && (
          <div className="flex flex-1 justify-end">
            {HEADER_MENUS.map((item) => (
              <HeaderMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  if (item.path === '#3') {
                    setOpenShareModal(true);
                  }
                }}
                item={item}
                key={item.path}
                active={location.pathname === item.path}
              />
            ))}
          </div>
        )}

        <div>
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
