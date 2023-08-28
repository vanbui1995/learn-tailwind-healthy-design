
import { IRecommendedItem } from '@/types/health';
import { v4 as uuidv4 } from 'uuid';


interface IRecommendedResponseAPI {
    data: IRecommendedItem[];
    pageParam: number;
}

export const getRecommendItemAPI = ({ pageParam = 0 }): Promise<IRecommendedResponseAPI> => {
    // This is mock data, in the real world, we will make the api call right here
    return Promise.resolve({
        data: [{
            id: uuidv4(),
            image: '/image/picture/column-1.jpg',
            date: new Date(),
            tags: '#魚料理  #和食  #DHA',
            title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
            meal: '05.21.Morning'
        }, {
            id: uuidv4(),
            image: '/image/picture/column-2.jpg',
            date: new Date(),
            tags: '#魚料理  #和食  #DHA',
            title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
            meal: '05.21.Lunch'
        }, {
            id: uuidv4(),
            image: '/image/picture/column-3.jpg',
            date: new Date(),
            tags: '#魚料理  #和食  #DHA',
            title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
            meal: '05.21.Dinner'
        }, {
            id: uuidv4(),
            image: '/image/picture/column-4.jpg',
            date: new Date(),
            tags: '#魚料理  #和食  #DHA',
            title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
            meal: '05.21.Snack'
        }, {
            id: uuidv4(),
            image: '/image/picture/column-5.jpg',
            date: new Date(),
            tags: '#魚料理  #和食  #DHA',
            title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
            meal: '05.21.Morning'
        }, {
            id: uuidv4(),
            image: '/image/picture/column-6.jpg',
            date: new Date(),
            tags: '#魚料理  #和食  #DHA',
            title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
            meal: '05.21.Lunch'
        }, {
            id: uuidv4(),
            image: '/image/picture/column-7.jpg',
            date: new Date(),
            tags: '#魚料理  #和食  #DHA',
            title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
            meal: '05.21.Dinner'
        }, {
            id: uuidv4(),
            image: '/image/picture/column-8.jpg',
            date: new Date(),
            tags: '#魚料理  #和食  #DHA',
            title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
            meal: '05.21.Snack'
        }],
        pageParam,
    })
}
