import { FC } from "react";

const HexagonButton: FC<{ name: string; icon: string }> = (props) => {
  const { name, icon } = props;
  return (
    <div className="flex items-center justify-center">
      <button className={'hexagon-btn relative'}>
        <span className={'z-10 absolute top-[60px] left-2/4 -translate-y-1/2 -translate-x-1/2 text-white text-[20px]'}>
          <img alt={name} src={icon} />
        </span>
        <span
          className={'z-10 absolute bottom-[20px] left-2/4 -translate-y-1/2 -translate-x-1/2 text-white text-[20px]'}
        >
          {name}
        </span>
        <img alt={name} src="/image/icons/icon-diamond.svg" />
        <span className="sr-only">Click the Chemex</span>
      </button>
    </div>
  );
};

export default HexagonButton;
