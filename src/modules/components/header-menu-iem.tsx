import { IHeaderMenu } from '@/enums';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  item: IHeaderMenu;
  active: boolean;
}

const HeaderMenuItem: FC<IProps> = (props) => {
  const { item, active } = props;
  const path = item.path[0] !== '#' ? item.path : '#';
  return (
    <Link
      to={path}
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
