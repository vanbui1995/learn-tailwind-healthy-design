
import { IExcercise } from '@/types/health';
import { v4 as uuidv4 } from 'uuid';


interface IExcerciseItemResponseAPI {
    data: IExcercise[];
    pageParam: number;
}

export const getExcercisesAPI = ({ pageParam = 0 }): Promise<IExcerciseItemResponseAPI> => {
    // This is mock data, in the real world, we will make the api call right here
    return Promise.resolve({
        data: Array(16).fill(0).map(item => ({
            id: uuidv4(),
            name: '家事全般（立位・軽い）',
            durationInMinute: 10,
            kcal: 26,
        })),
        pageParam,
    })
}

