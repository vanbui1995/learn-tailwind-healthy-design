
import { IRecommendedItem } from '@/types/health';
import dayjs from 'dayjs'

const RecommendedItem = (props: { item: IRecommendedItem }) => {
    const { item: { date, image, title, tags } } = props;
    return (
        <div className='min-w-[234px] w-[25%] max-md:w-1/3 flex-1 h-[222px] flex flex-col'>
            <div style={{ backgroundImage: `url(${image})` }} className='h-[144px] flex flex-1 relative bg-cover bg-center'>
                <span className='text-white absolute bottom-[0px] text-[15px] bg-primary300 leading-[30px] px-[8px] py-[3px]'>{dayjs(date).format('YYYY.MM.DD')}&nbsp;&nbsp;&nbsp;{dayjs(date).format('HH:mm')}</span>
            </div>
            <span className='text-[15px] leading-[22px] font-light'>
                {title}
            </span>
            <span className='h-[24px] text-[12px] leading-[22px] font-light text-primary500'>
                {tags}
            </span>
        </div>
    )
}

export default RecommendedItem;