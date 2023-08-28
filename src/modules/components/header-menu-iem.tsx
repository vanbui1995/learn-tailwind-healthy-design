import { IHeaderMenu } from '@/enums';
import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  item: IHeaderMenu;
  active: boolean;
}

const HeaderMenuItem = (props: IProps) => {
  const { item, active } = props;
  return (
    <Link
      key={item.path}
      to={item.path}
      className={`h-[49px] w-[160px] p-[8px] flex items-center gap-[8px] font-light link ${
        active ? 'link-active' : ''
      }`}
    >
      <img alt={item.name} src={item.icon}></img>
      <span>{item.name}</span>
    </Link>
  );
};

export default HeaderMenuItem;
