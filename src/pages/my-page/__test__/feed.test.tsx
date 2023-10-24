import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Feed } from '../feed';
import { VideoCreateDto } from '@/types';
import { Timestamp } from 'firebase/firestore';

describe('<Feed>', () => {
  beforeEach(() => {
    const date = new Date(2023, 1, 12);
    vi.useFakeTimers();
    vi.setSystemTime(date);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('render without error', () => {
    const video: VideoCreateDto = {
      createdAt: Timestamp.now(),
      id: '582aa717-30ca-4acb-879f-57a3d0899d49',
      userId: 'rCq5nSwVeYRQXSW0gYyZYmfN0dg2',
      description: 'a long description',
      email: 'vanbt@zigvy.com',
      title: 'Learn English with BOND James Bond — CASINO ROYALE',
      youtubeId: 'gSTtANPfyMI',
    };

    render(<Feed video={video} />);
    screen.getByText('Learn English with BOND James Bond — CASINO ROYALE');
    screen.getByText('a long description');
    screen.getByText('02/12/2023 12:00 am by');
    screen.getByText('vanbt@zigvy.com');
  });
});
