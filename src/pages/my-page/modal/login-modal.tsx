import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ErrorMessage } from '@hookform/error-message';
import { auth } from '@/modules/common';
import { Modal } from '@/modules/common';



const schema = yup.object().shape({
  email: yup.string().email().required('Required'),
  password: yup.string().min(6, 'Must be at least 6 characters').required('Required'),
});


type FormValues = {
  email: string;
  password: string;
};

export const LoginModal = (props: { showModal: boolean; toggleModal: () => void }) => {
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
      await signInWithEmailAndPassword(auth, values.email, values.password);
      setLoading(false);
      toast.success('Login successfully');
      toggleModal();
      reset();
    } catch (error) {
      setLoading(false);
      toast.error('Login failed, please try again!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Modal
        header={<span className="text-black">Login</span>}
        footer={
          <>
            <button
              disabled={loading}
              className="bg-purple450 hover:bg-purple400 disabled:bg-gray400 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="submit"
              style={{ transition: 'all .15s ease' }}
            >
              Sign In
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
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            aria-label='Email Input'
            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="Email"
            style={{ transition: 'all .15s ease' }}
          />
          <div className="text-[red] text-sm mt-2">
            <ErrorMessage errors={errors} name="email" />
          </div>
        </div>

        <div className="relative w-full mb-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            aria-label='Password Input'
            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="Password"
            style={{ transition: 'all .15s ease' }}
          />
        </div>
        <div className="text-[red] text-sm mt-2">
          <ErrorMessage errors={errors} name="password" />
        </div>
      </Modal>
    </form>
  );
};
