import React, { useMemo } from 'react'

import RecommendedFactor, { IRecommendedFactor } from './recommended-factor/recommended-factor';
import RecommendedItem, { IRecommendedItem } from './recommended-item/recommended-item';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getRecommendItemAPI } from '@/services';


const ALL_RECOMMENDED_FACTORS: IRecommendedFactor[] = [{
    title: 'RECOMMENDED COLUMN',
    shortTitle: 'オススメ'
}, {
    title: 'RECOMMENDED DIET',
    shortTitle: 'ダイエット'
}, {
    title: 'RECOMMENDED BEAUTY',
    shortTitle: '美容'
}, {
    title: 'RECOMMENDED HEALTH',
    shortTitle: '健康'
}]



const ColumnPage = () => {


    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['recommend-item'],
        queryFn: getRecommendItemAPI,
        getNextPageParam: (lastPage, pages) => lastPage.pageParam + 1,
    })

    const handleLoadMore = React.useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        fetchNextPage()
    }, [fetchNextPage])

    const recommendedItems = useMemo(() => {
        return data?.pages.reduce((current: IRecommendedItem[], page) => {
            return [...current, ...page.data]
        }, []) || [];
    }, [data])

    return (
        <div className='flex-1 max-w-[960px] mx-auto my-0'>
            <div className="py-[56px] flex flex-1 flex-row gap-[32px] max-md:flex-col max-lg:gap-[12px] max-lg:px-[12px]">
                {ALL_RECOMMENDED_FACTORS.map(item => (
                    <RecommendedFactor item={item} key={item.title} />
                ))}

            </div>
            <div className="flex flex-wrap gap-[8px] max-lg:px-[12px]">
                {
                    recommendedItems.map(item => (
                        <RecommendedItem key={item.id} item={item} />
                    ))
                }
                <div className='min-w-[234px] w-[25%] max-md:w-1/3 flex-1 flex flex-col' />
                <div className='min-w-[234px] w-[25%] max-md:w-1/3 flex-1 flex flex-col' />
                <div className='min-w-[234px] w-[25%] max-md:w-1/3 flex-1 flex flex-col' />
                    
                
            </div>
            <div className='flex mt-[26px] mb-[56px] justify-center'>
                <button disabled={!hasNextPage && !isFetchingNextPage && !isFetching} onClick={handleLoadMore} className='btn w-[296px]'>コラムをもっと見る</button>
            </div>
        </div>

    )
}

export default ColumnPage;