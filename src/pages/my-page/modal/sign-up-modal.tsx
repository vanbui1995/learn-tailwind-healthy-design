import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ErrorMessage } from '@hookform/error-message';
import { Modal } from '@/modules/common';
import { auth } from '@/modules/common';
import { useState } from 'react';
import { toast } from 'react-toastify';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required('Required'),
  password: yup.string().min(6, 'Must be at least 6 characters').required('Required'),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    })
    .required('Required'),
});

export const SignUpModal = (props: { showModal: boolean; toggleModal: () => void }) => {
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
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      setLoading(false);
      toast.success('Register & login successfully');
      toggleModal();
      reset();
    } catch (error) {
      setLoading(false);
      toast.error('Register failed, please try again!');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Modal
        header={<span className="text-black">Register</span>}
        footer={
          <>
            <button
              disabled={loading}
              className="bg-purple450 disabled:bg-gray400 hover:bg-purple400 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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
            Email
          </label>
          <input
            {...register('email')}
            aria-label="Email Input"
            name="email"
            type="email"
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
            name="password"
            aria-label="Password Input"
            type="password"
            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="Password"
            style={{ transition: 'all .15s ease' }}
          />
          <div className="text-[red] text-sm mt-2">
            <ErrorMessage errors={errors} name="password" />
          </div>
        </div>
        <div className="relative w-full mb-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
            Re-Password
          </label>
          <input
            {...register('confirmPassword')}
            aria-label="Confirm Input"
            name="confirmPassword"
            type="password"
            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="Re-Password"
            style={{ transition: 'all .15s ease' }}
          />
          <div className="text-[red] text-sm mt-2">
            <ErrorMessage errors={errors} name="confirmPassword" />
          </div>
        </div>
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              id="customCheckLogin"
              type="checkbox"
              className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
              style={{ transition: 'all .15s ease' }}
            />
          </label>
        </div>
      </Modal>
    </form>
  );
};
