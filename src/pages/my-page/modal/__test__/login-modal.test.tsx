import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginModal } from '../login-modal';
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/modules/common';
import { ToastContainer } from 'react-toastify';

describe('<LoginModal>', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render without error', () => {
    render(<LoginModal showModal toggleModal={() => null} />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('validation work properly', async () => {
    render(<LoginModal showModal toggleModal={() => null} />);
    fireEvent.click(screen.getByText('Sign In'));
    // Expect error show on both email & password fields
    await screen.findByText('Required');

    await screen.findByText('Must be at least 6 characters');
    // Validate email first
    fireEvent.input(screen.getByLabelText('Email Input'), { target: { value: 'vanbt' } });
    await screen.findByText('email must be a valid email');
    fireEvent.input(screen.getByLabelText('Email Input'), { target: { value: 'vanbt@zigvy.com' } });

    await waitFor(() => {
      const emailError = screen.queryByText('email must be a valid email');
      expect(emailError).toBe(null);
    });
    // Validate password
    fireEvent.input(screen.getByLabelText('Password Input'), { target: { value: '1234' } });
    await screen.findByText('Must be at least 6 characters');
    fireEvent.input(screen.getByLabelText('Password Input'), { target: { value: '123456' } });
    await waitFor(() => {
      const emailError = screen.queryByText('Must be at least 6 characters');
      expect(emailError).toBe(null);
    });
  });

  it('submit successfully', async () => {
    vi.mock('firebase/auth');
    const mockedSignIn = vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce({} as UserCredential);
    render(
      <div>
        <ToastContainer />
        <LoginModal showModal toggleModal={() => null} />
      </div>,
    );
    fireEvent.input(screen.getByLabelText('Email Input'), { target: { value: 'vanbt@zigvy.com' } });
    fireEvent.input(screen.getByLabelText('Password Input'), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Sign In'));
    await waitFor(async () => {
      expect(mockedSignIn).toHaveBeenLastCalledWith(auth, 'vanbt@zigvy.com', '123456');
      fireEvent.click(screen.getByText('Login successfully'));
    });
  });

  it('submit failed', async () => {
    vi.mock('firebase/auth');
    const mockedSignIn = vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce({} as UserCredential);
    render(
      <div>
        <ToastContainer />
        <LoginModal showModal toggleModal={() => null} />
      </div>,
    );
    fireEvent.input(screen.getByLabelText('Email Input'), { target: { value: 'vanbt@zigvy.com' } });
    fireEvent.input(screen.getByLabelText('Password Input'), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Sign In'));
    await waitFor(async () => {
      expect(mockedSignIn).toHaveBeenLastCalledWith(auth, 'vanbt@zigvy.com', '123456');
      fireEvent.click(screen.getByText('Login failed, please try again!'));
    });
  })
  
});
