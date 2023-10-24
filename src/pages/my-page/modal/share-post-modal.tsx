import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { UserInfo, signInWithEmailAndPassword } from 'firebase/auth';
import { ErrorMessage } from '@hookform/error-message';

import { getYoutubeMetadata } from '@/services/youtube';
import { Response, VideoCreateDto } from '@/types/youtube';
import { YOUTUBE_REGEX } from '@/enums';
import { auth, db } from '@/modules/common';
import { Modal } from '@/modules/common';

export const prepareCreateDto = (metadata: Response): VideoCreateDto => {
  const currentUser = auth.currentUser as UserInfo;

  return {
    id: uuidv4(),
    createdAt: Timestamp.now(),
    userId: currentUser.uid,
    email: currentUser.email as string,
    youtubeId: metadata.items[0].id,
    title: metadata.items[0].snippet.title,
    description: metadata.items[0].snippet.description,
  };
};

const schema = yup.object().shape({
  link: yup
    .string()
    .matches(YOUTUBE_REGEX, {
      message: 'Invalid youtube link',
    })
    .required('Required'),
});

export const getYoutubeId = (url: string) => {
  const match = url.match(YOUTUBE_REGEX);
  return match && match[7].length == 11 ? match[7] : null;
};

type FormValues = {
  link: string;
};

export const SharePostModal = (props: { showModal: boolean; toggleModal: () => void }) => {
  const { showModal, toggleModal } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver<FormValues>(schema),
  });

  const onSubmitHandler = async (values: FormValues) => {
    try {
      setLoading(true);
      const youtubeLink = getYoutubeId(values.link);
      const metadata = await getYoutubeMetadata(youtubeLink as string);
      const data = prepareCreateDto(metadata);
      await setDoc(doc(db, 'videos', data.id), data);
      toast.success(`Add new youtube video "${data.title}" successfully`);
      toggleModal();
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Add new youtube video failed, please try again!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Modal
        header={<span className="text-black">Share a new video</span>}
        footer={
          <>
            <button
              disabled={loading}
              className="bg-purple450 hover:bg-purple400 disabled:bg-gray400 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="submit"
              style={{ transition: 'all .15s ease' }}
            >
              Submit
            </button>
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={toggleModal}
            >
              Close
            </button>
          </>
        }
        showModal={showModal}
        toggleModal={toggleModal}
      >
        <div className="relative mb-3 w-[500px]">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
            Youtube Link
          </label>
          <input
            {...register('link')}
            aria-label="Youtube link"
            type="text"
            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="https://www.youtube.com/watch?v"
            style={{ transition: 'all .15s ease' }}
          />
          <div className="text-[red] text-sm mt-2">
            <ErrorMessage errors={errors} name="link" />
          </div>
        </div>
      </Modal>
    </form>
  );
};
