import { IHeaderMenu } from '@/enums';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  item: IHeaderMenu;
  active: boolean;
  badge?: number;
}

const HeaderMenuItem: FC<IProps> = (props) => {
  const { item, active, badge = 0 } = props;
  const path = item.path[0] !== '#' ? item.path : '#';
  return (
    <Link
      to={path}
      className={`h-[49px] w-[160px] p-[8px] flex items-center gap-[8px] font-light link ${
        active ? 'link-active' : ''
      }`}
    >
      <img alt={item.name} src={item.icon}></img>

      <span className="relative">
        {badge > 0 && (
          <span className="w-[16px] h-[16px] absolute top-[-10px] left-[-20px] bg-primary500 rounded-full text-[10px] leading-[12px] text-white flex items-center justify-center">
            {badge}
          </span>
        )}
        {item.name}
      </span>
    </Link>
  );
};

export default HeaderMenuItem;
