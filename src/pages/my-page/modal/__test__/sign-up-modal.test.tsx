import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SignUpModal } from '../sign-up-modal';
import { UserCredential, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/modules/common';
import { ToastContainer } from 'react-toastify';

describe('<SignUpModal>', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('render without error', () => {
    render(<SignUpModal showModal toggleModal={() => null} />);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
  it('validation work properly', async () => {
    render(<SignUpModal showModal toggleModal={() => null} />);
    fireEvent.click(screen.getByText('Submit'));
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
    // Confirm password
    fireEvent.input(screen.getByLabelText('Confirm Input'), { target: { value: '123' } });
    await screen.findByText('Passwords must match');
    fireEvent.input(screen.getByLabelText('Confirm Input'), { target: { value: '123456' } });
    await waitFor(() => {
      const emailError = screen.queryByText('Passwords must match');
      expect(emailError).toBe(null);
    });
    
  });
  it('submit successfully', async () => {
    vi.mock('firebase/auth');
    const mockedSignUp = vi.mocked(createUserWithEmailAndPassword).mockResolvedValueOnce({} as UserCredential);
    render(
      <div>
        <ToastContainer />
        <SignUpModal showModal toggleModal={() => null} />
      </div>,
    );
    fireEvent.input(screen.getByLabelText('Email Input'), { target: { value: 'vanbt@zigvy.com' } });
    fireEvent.input(screen.getByLabelText('Password Input'), { target: { value: '123456' } });
    fireEvent.input(screen.getByLabelText('Confirm Input'), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(async () => {
      expect(mockedSignUp).toHaveBeenLastCalledWith(auth, 'vanbt@zigvy.com', '123456');
      fireEvent.click(screen.getByText('Register & login successfully'));
    });
  });

  it('submit failed', async () => {
    vi.mock('firebase/auth');
    const mockedSignUp = vi.mocked(createUserWithEmailAndPassword).mockRejectedValueOnce({} as UserCredential);
    render(
      <div>
        <ToastContainer />
        <SignUpModal showModal toggleModal={() => null} />
      </div>,
    );
    fireEvent.input(screen.getByLabelText('Email Input'), { target: { value: 'vanbt@zigvy.com' } });
    fireEvent.input(screen.getByLabelText('Password Input'), { target: { value: '123456' } });
    fireEvent.input(screen.getByLabelText('Confirm Input'), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(async () => {
      expect(mockedSignUp).toHaveBeenLastCalledWith(auth, 'vanbt@zigvy.com', '123456');
      fireEvent.click(screen.getByText('Register failed, please try again!'));
    });
  });
});
