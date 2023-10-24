import { describe, it, expect, vi } from 'vitest';
import * as uuid from 'uuid';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Auth } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import { SharePostModal, prepareCreateDto, getYoutubeId } from '../share-post-modal';
import * as sharePost from '../share-post-modal';
import { Response } from '@/types';
import { Timestamp, setDoc } from 'firebase/firestore';
import * as youtubeService from '@/services/youtube';

const input: Response = {
  items: [
    {
      id: 'tsxmyL7TUJg',
      snippet: {
        title: 'The American Civil War - OverSimplified (Part 1)',
        description: 'test',
      },
    },
  ],
};

describe('prepareCreateDto', () => {
  beforeEach(() => {
    const date = new Date(2023, 1, 12);
    vi.useFakeTimers();
    vi.setSystemTime(date);
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it('transform correctly', () => {
    vi.spyOn(uuid, 'v4').mockReturnValue('bbc815d8-22de-47dd-a345-01d54af19bcf');
    vi.mock('firebase/auth', () => {
      return {
        getAuth: () => {
          return {
            currentUser: {
              email: 'vanbt@zigvy.com',
              uid: 'id_1',
            },
          } as Auth;
        },
      };
    });

    const expectedWithoutTime = prepareCreateDto(input);
    expect(expectedWithoutTime).deep.equal({
      createdAt: Timestamp.now(),
      description: 'test',
      email: 'vanbt@zigvy.com',
      id: 'bbc815d8-22de-47dd-a345-01d54af19bcf',
      title: 'The American Civil War - OverSimplified (Part 1)',
      userId: 'id_1',
      youtubeId: 'tsxmyL7TUJg',
    });
  });
});

describe('<SharePostModal>', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render without error', () => {
    render(<SharePostModal showModal toggleModal={() => null} />);
  });

  it('validate youtube link', async () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
    render(<SharePostModal showModal toggleModal={() => null} />);
    fireEvent.click(screen.getByText('Submit'));
    await screen.findByText('Invalid youtube link');
    fireEvent.input(screen.getByLabelText('Youtube link'), { target: { value: 'https://www.google.com/2323' } });
    await screen.findByText('Invalid youtube link');
    fireEvent.input(screen.getByLabelText('Youtube link'), {
      target: { value: 'https://www.youtube.com/watch?v=tsxmyL7TUJg' },
    });
    await waitFor(() => {
      const youtubeLinkValidError = screen.queryByText('Invalid youtube link');
      expect(youtubeLinkValidError).toBe(null);
      fireEvent.click(screen.getByText('Submit'));
    });
  });

  it('share post successfully', async () => {
    // Prepare mock api
    vi.spyOn(youtubeService, 'getYoutubeMetadata').mockResolvedValueOnce(input);
    vi.spyOn(uuid, 'v4').mockReturnValue('bbc815d8-22de-47dd-a345-01d54af19bcf');
    vi.mock('firebase/firestore');
    const mockSetDoc = vi.mocked(setDoc).mockResolvedValueOnce();
    vi.mock('firebase/auth', () => {
      return {
        getAuth: () => {
          return {
            currentUser: {
              email: 'vanbt@zigvy.com',
              uid: 'id_1',
            },
          } as Auth;
        },
      };
    });
    // End prepare mock api
    render(
      <div>
        <ToastContainer />
        <SharePostModal showModal toggleModal={() => null} />
      </div>,
    );
    fireEvent.input(screen.getByLabelText('Youtube link'), {
      target: { value: 'https://www.youtube.com/watch?v=tsxmyL7TUJg' },
    });
    fireEvent.click(screen.getByText('Submit'));
    await screen.findByText('Add new youtube video "The American Civil War - OverSimplified (Part 1)" successfully');
    expect(mockSetDoc).toBeCalledWith(undefined, {
      id: 'bbc815d8-22de-47dd-a345-01d54af19bcf',
      createdAt: undefined,
      userId: 'id_1',
      email: 'vanbt@zigvy.com',
      youtubeId: 'tsxmyL7TUJg',
      title: 'The American Civil War - OverSimplified (Part 1)',
      description: 'test',
    });
  });

  it('share post failed', async () => {
    // Prepare mock api
    vi.spyOn(youtubeService, 'getYoutubeMetadata').mockRejectedValueOnce(input);
    vi.spyOn(uuid, 'v4').mockReturnValue('bbc815d8-22de-47dd-a345-01d54af19bcf');
    vi.mock('firebase/firestore');
    const mockSetDoc = vi.mocked(setDoc);
    vi.mock('firebase/auth', () => {
      return {
        getAuth: () => {
          return {
            currentUser: {
              email: 'vanbt@zigvy.com',
              uid: 'id_1',
            },
          } as Auth;
        },
      };
    });
    // End prepare mock api
    render(
      <div>
        <ToastContainer />
        <SharePostModal showModal toggleModal={() => null} />
      </div>,
    );
    fireEvent.input(screen.getByLabelText('Youtube link'), {
      target: { value: 'https://www.youtube.com/watch?v=tsxmyL7TUJg' },
    });
    fireEvent.click(screen.getByText('Submit'));
    await screen.findByText('Add new youtube video failed, please try again!');
    expect(mockSetDoc).not.toHaveBeenCalled();
  });
});

describe('getYoutubeId', () => {
  it('extract correctly the id', () => {
    expect(getYoutubeId('https://www.youtube.com/watch?v=tsxmyL7TUJg')).toBe('tsxmyL7TUJg');
    expect(getYoutubeId('https://www.youtube.com/watch?v=sL3GsB-2_ek&ab_channel=ToFluency')).toBe('sL3GsB-2_ek');
  });

  it('return null when the youtube link is invalid', () => {
    expect(getYoutubeId('https://www.youtube.com')).toBe(null);
    expect(getYoutubeId('https://www.google.com/2323')).toBe(null);
  });
});
