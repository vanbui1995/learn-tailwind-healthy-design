import { MEAL_BUTTONS } from '@/enums/health';
import { FC } from 'react';
import HexagonButton from './hexagon-button';

const MealButton = () => {
  return (
    <div className="flex justify-center max-md:block">
      <div className={'grid grid-cols-4 gap-[74px] py-[1.5rem] max-md:grid-cols-2 max-md:gap-[24px]'}>
        {MEAL_BUTTONS.map((i) => (
          <HexagonButton key={i.name} name={i.name} icon={i.icon} />
        ))}
      </div>
    </div>
  );
};

export default MealButton;

