import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Auth, User, UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import * as useAuthUtil from '@/modules/common/firebase/useAuth';
import { ToastContainer } from 'react-toastify';
import { VideoCreateDto } from '@/types';
import { Timestamp, onSnapshot } from 'firebase/firestore';
import MyPage from './my-page';
import { auth } from '@/modules/common';

describe('<MyPage>', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render without error', () => {
    render(<MyPage />);
    screen.getByText('Shared Videos:');
  });

  it('load youtube video successfully', async () => {
    vi.spyOn(useAuthUtil, 'useAuth').mockReturnValue({
      currentUser: {
        email: 'vanbt@zigvy.com',
        uid: 'id_1',
      } as User,
      auth: {} as Auth,
    });

    vi.mock('firebase/firestore', () => {
      const data = [
        {
          data(): VideoCreateDto {
            return {
              createdAt: { toDate: () => new Date('2022-03-25') } as Timestamp,
              id: '582aa717-30ca-4acb-879f-57a3d0899d49',
              userId: 'rCq5nSwVeYRQXSW0gYyZYmfN0dg2',
              description: 'a long description',
              email: 'vanbt@zigvy.com',
              title: 'Learn English with BOND James Bond — CASINO ROYALE',
              youtubeId: 'gSTtANPfyMI',
            };
          },
        },
      ];
      return {
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        query: vi.fn().mockReturnThis(),
        getFirestore: () => null,
        collection: vi.fn().mockReturnThis(),
        onSnapshot: vi.fn().mockImplementation((query, callback) => {
          callback({
            docs: data,
            docChanges: () => [],
          });
          return vi.fn();
        }),
      };
    });

    render(<MyPage />);

    await screen.findByText('Shared Videos:');
    screen.getByText('Learn English with BOND James Bond — CASINO ROYALE');
    screen.getByText('a long description');
    screen.getByText('03/25/2022 07:00 am by');
    screen.getByText('vanbt@zigvy.com');
  });

  it('notification should work when new video from another logged user', async () => {
    vi.spyOn(useAuthUtil, 'useAuth').mockReturnValue({
      currentUser: {
        email: 'vanbt@zigvy.com',
        uid: 'id_1', // This is current user
      } as User,
      auth: {} as Auth,
    });

    vi.mock('firebase/firestore', () => {
      const data = [
        {
          data(): VideoCreateDto {
            return {
              createdAt: { toDate: () => new Date('2022-03-25') } as Timestamp,
              id: '582aa717-30ca-4acb-879f-57a3d0899d49',
              userId: 'id_2', // This video belong to another user
              description: 'a long description',
              email: 'vanbt@zigvy.com',
              title: 'Learn English with BOND James Bond — CASINO ROYALE',
              youtubeId: 'gSTtANPfyMI',
            };
          },
        },
      ];
      const data1 = [
        {
          data(): VideoCreateDto {
            return {
              createdAt: { toDate: () => new Date('2022-03-25') } as Timestamp,
              id: '582aa717-30ca-4acb-879f-57a3d0899111',
              userId: 'id_1', // This video belong to another user
              description: 'a long description',
              email: 'vanbt@zigvy.com',
              title: 'Learn English with BOND James Bond — CASINO ROYALE',
              youtubeId: 'gSTtANPfyMI',
            };
          },
        },
      ];
      return {
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockImplementation((number) => number),
        query: vi.fn().mockImplementation((collection, limit) => ({
          collection,
          limit,
        })),
        getFirestore: () => null,
        collection: vi.fn().mockImplementation((db, collection) => ({ db, collection })),
        onSnapshot: vi.fn().mockImplementation((query, callback) => {
          if (query.limit === 1) {
            callback({
              docs: [],
              docChanges: () => [
                {
                  type: 'added',
                  doc: data[0],
                },
              ],
            });
          } else {
            callback({
              docs: data1,
            });
          }
          return vi.fn();
        }),
      };
    });

    render(
      <div>
        <ToastContainer />
        <MyPage />
      </div>,
    );

    await screen.findAllByText(
      'New video "Learn English with BOND James Bond — CASINO ROYALE" has just been shared by vanbt@zigvy.com',
    );
  });
});
