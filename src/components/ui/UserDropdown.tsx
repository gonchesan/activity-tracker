import useAuth from '@/hooks/useAuth';
import React from 'react';
import Dropdown, { ItemMenu } from './Dropdown';

const UserDropdown: React.FC = () => {
  const { signOut, user } = useAuth();

  const AvatarUser = () => {
    {
      return (
        <div className="rounded-full w-[30px] h-[30px] bg-teal-700 text-white grid place-content-center">
          {user.picture ? (
            <img src={user.picture} className="rounded-full w-[32px] h-[32px]" alt="" loading="lazy" />
          ) : (
            user.email?.substring(0, 2).toUpperCase()
          )}
        </div>
      );
    }
  };

  const items: ItemMenu[] = [
    {
      label: 'Log out',
      onClick: () => signOut(),
    },
  ];

  return (
    <Dropdown
      button={{
        icon: <AvatarUser />,
        shape: 'circle',
        className:
          'inline-flex justify-center gap-x-1.5 bg-transparent mx-2 my-2 px-1 py-1 text-gray-500 shadow-sm hover:ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition duration-300',
      }}
      menu={items}
    />
  );
};

export default UserDropdown;
