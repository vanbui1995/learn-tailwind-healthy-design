import { Response } from '@/types/youtube';
import axios from 'axios';

export const getYoutubeMetadata = async (youtubeId: string) => {
    const response = await axios.get<Response>(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&fields=items/id,items/snippet/title,items/snippet/description&key=AIzaSyDNYG82FvM3DUItCS66ggTUL9fuCCIrGsA`,
    );
    return response.data;
  };