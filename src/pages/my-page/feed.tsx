
import dayjs from 'dayjs'
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { VideoCreateDto } from '@/types/youtube';



import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export const Feed = (props: { video: VideoCreateDto }) => {
  const { video } = props;
  return (
    <div className="feed flex flex-1 p-[30px] p-b-[0px] bg-white rounded-md gap-[18px] max-md:flex-col">
      <div className="feed-media flex-1 aspect-video relative">
        <LiteYouTubeEmbed id={video.youtubeId} title={video.title} />
      </div>
      <div className="feed-info w-[50%] max-md:w-[auto]">
        <div className="flex flex-col gap-[18px]">
          <div className="flex">
            <div className="text-[11px] text-gray400 flex justify-center gap-[10px]">
              <img src="/image/icons/calendar.svg" alt="date" />

              <span>
                {dayjs(video.createdAt.toDate()).format('MM/DD/YYYY hh:mm a')} by <span className="font-bold">{video.email}</span>
              </span>
            </div>
          </div>

          <span className="font-bold text-purple450">{video.title}</span>
          <p title={video.description} className="text-[12px] line-clamp-4">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};
