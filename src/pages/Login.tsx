import React from 'react';
import { NavLink } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import useForm from '@/hooks/useForm';

import GoogleIcon from '@/assets/icons/google.svg?react';

import { SignInType } from '@/models/auth';
import Button from '@/components/ui/Button';

const LoginPage: React.FC = () => {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const { formData, handleInputChange, getValues, setValues } = useForm();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { email, password } = getValues() as SignInType;

    // Add another validations
    if (email && password) {
      signInWithEmail(getValues());
    }
  }
  React.useEffect(() => {
    setValues({ email: '', password: '' });

    return () => {
      setValues({});
    };
  }, []);

  const { email, password } = formData;

  return (
    formData && (
      <section className="bg-gray-200 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8 rounded-lg bg-white shadow-md xl:w-3/12 md:w-6/12 sm:w-10/12">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600"
            alt="Your Company"
          />
          <h2 className="text-center text-lg">Sign in to your account</h2>

          <form className="mt-6 grid grid-cols-4 gap-4 grid-flow-row-dense" onSubmit={handleSubmit}>
            <div className="col-span-4">
              <label className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
              <div className="mt-2.5">
                <input
                  className="col-span-4 w-full px-2 py-2 resize-none  block rounded-md  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600  outline-none"
                  placeholder="your-email@gmail.com"
                  name="email"
                  onChange={handleInputChange}
                  value={email || ''}
                  autoFocus
                />
              </div>
            </div>
            <div className="col-span-4">
              <label className="block text-sm font-semibold leading-6 text-gray-900">Password</label>
              <div className="mt-2.5">
                <input
                  type="password"
                  className="col-span-4 w-full px-2 py-2 resize-none  block rounded-md  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600  outline-none"
                  name="password"
                  onChange={handleInputChange}
                  value={password || ''}
                  placeholder="*********"
                />
              </div>
            </div>
            <div className="col-span-4">
              <Button type="submit" block shape="round" appearance="primary" onSubmit={handleSubmit}>
                Login
              </Button>
            </div>
          </form>
          <p
            className="text-center overflow-hidden before:h-[1px] after:h-[1px] after:bg-gray-300 
           after:inline-block after:relative after:align-middle after:w-1/4 
           before:bg-gray-300 before:inline-block before:relative before:align-middle 
           before:w-1/4 before:right-2 after:left-2 text-xs text-gray-600 py-4 font-medium"
          >
            Or continue with
          </p>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Button
              type="button"
              onClick={signInWithGoogle}
              icon={<GoogleIcon />}
              shape="round"
              block
              appearance="secondary"
            >
              <span className="-600 ml-2 font-medium">Sign in with google</span>
            </Button>
          </div>
          <p className="mt-6 text-xs text-center text-gray-500">
            Don't have an account?
            <NavLink to="/register" className="ml-1 font-semibold leading-6 text-teal-600 hover:text-teal-500">
              Register here
            </NavLink>
          </p>
        </div>
      </section>
    )
  );
};

export default LoginPage;
