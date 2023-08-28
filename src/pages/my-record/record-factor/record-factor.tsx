


export interface IRecordFactor {
    name: string;
    explain: string;
}

const RercordFactorItem = (props: { factor: IRecordFactor }) => {
    const { factor: { name, explain } } = props;
    return (
        <div className='w-full h-[240px] max-md:h-[150px] flex bg-black border-[24px] max-md:border-[12px] border-solid border-primary300 relative'>
            <div className="w-full h-full bg-dark600 opacity-75 absolute top-[0] left-[0] z-20">
            </div>
            <div className="w-full h-full bg-cover bg-center mix-blend-luminosity" style={{ backgroundImage: `url(public/image/picture/MyRecommend-1.jpg)` }}>
            </div>
            <div className="absolute top-[0] left-[0] z-30 w-full h-full flex flex-col justify-center items-center gap-[10px]">
                <span className="text-[25px] text-primary300">
                    {name}
                </span>
                <span className="w-[160px] h-[20px] text-[14px] font-light bg-primary400 text-white text-center">
                    {explain}
                </span>
            </div>
        </div>
    )
}

export default RercordFactorItem;