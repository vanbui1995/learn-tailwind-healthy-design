import { IRecommendedFactor } from '@/types/health';


const RecommendedFactor = (props: { item: IRecommendedFactor }) => {
    const { item: { title, shortTitle } } = props;
    return (
        <div className='recommended flex w-full flex-col h-[144px] bg-dark600 justify-center items-center gap-[8px]'>
            <span className='text-[22px] text-center leading-[27px] text-primary300'>{title}</span>
            <div className='w-[56px] h-[1px] bg-white'></div>
            <span className='text-[18px] text-white font-light'>{shortTitle}</span>
        </div>
    )
}

export default RecommendedFactor;