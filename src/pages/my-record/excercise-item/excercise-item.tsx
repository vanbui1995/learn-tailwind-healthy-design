
export interface IExcercise {
    id: string;
    name: string;
    durationInMinute: number;
    kcal: number;
}

const ExcerciseItem = (props: { excercise: IExcercise }) => {
    const { excercise: { name, durationInMinute, kcal } } = props;
    return (
        <div className="h-[40px] border-borderColor border-0 border-b-[1px] border-solid">
            <div className="flex flex-1 text-white border-0">
                <div className="text-[5px] w-[13px]">
                    ●
                </div>
                <div className="flex flex-1 justify-between">
                    <div className="flex flex-col">
                        <span className="text-[15px] leading-[22px] font-light">
                            {name}
                        </span>
                        <span className="text-[15px] leading-[15px] text-primary300">
                            {kcal}kcal
                        </span>
                    </div>
                    <div className="text-[18px] leading-[22px] text-primary300">
                        {durationInMinute} min
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExcerciseItem;