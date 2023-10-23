import { db } from '@/modules/common';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Feed } from './feed';
import { VideoCreateDto } from '@/types/youtube';
import { useAuth } from '@/modules/common';
import { toast } from 'react-toastify';

const MyPage = () => {
  const [videos, setVideos] = useState<VideoCreateDto[]>([]);
  const { currentUser } = useAuth();
  const firstLoadRef = useRef<boolean>(false);
  useEffect(() => {
    const queryVideo = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    const queryNewVideo = query(collection(db, 'videos'), limit(1), orderBy('createdAt', 'desc'));

    const unsubscribeNewVideo = onSnapshot(queryNewVideo, (snapshot) => {
      snapshot.docChanges().forEach((changedRecord) => {
        if (changedRecord.type === 'added' && firstLoadRef.current) {
          const newVideo = changedRecord.doc.data() as VideoCreateDto;
          // Check the video does not belong to current user, popup the notifiation
          if (newVideo.userId && newVideo.userId !== currentUser?.uid) {
            toast.info(`New video "${newVideo.title}" has just been shared by ${newVideo.email}`);
          }
        }
      });
    });
    const unsubscribeVideo = onSnapshot(queryVideo, (snapshot) => {
      const updatedVideos = snapshot.docs.map((doc) => {
        return doc.data() as VideoCreateDto;
      });
      setVideos(updatedVideos);
      if (!firstLoadRef.current) {
        firstLoadRef.current = true;
      }
    });

    return () => {
      unsubscribeVideo();
      unsubscribeNewVideo();
    };
  }, [currentUser?.uid]);
  return (
    <div className="flex flex1 justify-center bg-[rgb(198,202,241)]">
      <div className="w-[800px] p-[30px] flex flex-col gap-[30px]">
        {videos.map((video) => (
          <Feed key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default MyPage;
