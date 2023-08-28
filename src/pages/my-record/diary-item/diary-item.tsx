import { IDiaryItem } from '@/types/health';
import dayjs from 'dayjs'

const DiaryItem = (props: { diary: IDiaryItem }) => {
  const {
    diary: { date, title },
  } = props;
  return (
    <div className="min-w-[231px] w-[25%] max-md:w-1/3 flex-1 h-[231px] bg-light flex flex-col gap-[8px] p-[16px] border-1 border-solid border-borderColor">
      <span className="text-[18px] leading-[22px]">
        {dayjs(date).format('YYYY.MM.DD')} <br />
        {dayjs(date).format('HH:MM')}
      </span>

      <p className="whitespace-pre-wrap text-[12px] font-light">{title}</p>
    </div>
  );
};

export default DiaryItem;
