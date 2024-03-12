import React from 'react';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

import LogOutIcon from '@/assets/icons/logout.svg?react';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  // {user.picture ? (
  //     <img
  //         src={user.picture}
  //         className="rounded-full"
  //         style={{ height: '25px', width: '25px' }}
  //         alt=""
  //         loading="lazy"
  //     />
  // ) : (
  //     <div className="rounded-full w-[30px] h-[30px] bg-indigo-400 text-white grid place-content-center">
  //         {user.email?.toUpperCase()[0]}
  //     </div>
  // )}

  return (
    user && (
      <nav className="fixed bg-sky-950 w-[calc(100%-1rem)] bottom-0 rounded-lg m-2 z-10 flex md:flex-col md:justify-between">
        <button className="p-3 m-3 text-teal-600">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              fill="currentColor"
              d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
            />
          </svg>
        </button>
        <button className="p-3 m-3 text-teal-600">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              fill="currentColor"
              d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
            />
          </svg>
        </button>
      </nav>
    )
  );
};

export default Navbar;
