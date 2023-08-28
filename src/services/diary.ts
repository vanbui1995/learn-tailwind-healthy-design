import { IDiaryItem } from '@/types/health';
import { v4 as uuidv4 } from 'uuid';

interface IDiaryItemResponseAPI {
  data: IDiaryItem[];
  pageParam: number;
}

export const getDiariesAPI = ({ pageParam = 0 }): Promise<IDiaryItemResponseAPI> => {
  // This is mock data, in the real world, we will make the api call right here
  return Promise.resolve({
    data: Array(8)
      .fill(0)
      .map((item) => ({
        id: uuidv4(),
        date: new Date(),
        title: `私の日記の記録が一部表示されます。 \nテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
      })),
    pageParam,
  });
};
