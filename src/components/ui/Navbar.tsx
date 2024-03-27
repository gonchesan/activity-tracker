import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import useAuth from '@/hooks/useAuth';

import HomeIcon from '@/assets/icons/home.svg?react';
import ActivitiesIcon from '@/assets/icons/clock-filled.svg?react';
import StatisticIcon from '@/assets/icons/statistic.svg?react';

const NAV_ROUTES = [
  { title: 'Home', slug: '/home', icon: <HomeIcon /> },
  { title: 'Activities', slug: '/activities', icon: <ActivitiesIcon /> },
  { title: 'Statistic', slug: '/statistic', icon: <StatisticIcon /> },
];

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
      <nav className="fixed bg-gray-100 w-[calc(100%-1rem)] bottom-0 rounded-lg m-2 z-5 flex">
        {NAV_ROUTES.map(route => (
          <NavLink
            key={route.title}
            title={route.title}
            to={route.slug}
            className={({ isActive }) =>
              classnames(
                'relative p-3 m-3 transition duration-200 before:absolute  before:bottom-0 before:left-1/2 before:w-1 before:h-1 before:rounded-full before:-translate-x-1/2',
                {
                  'text-gray-900 before:absolute before:bg-gray-900 before:bottom-0 before:left-1/2 before:w-1 before:h-1 before:rounded-full before:-translate-x-1/2':
                    isActive,
                  'text-gray-400 before:bg-transparent': !isActive,
                }
              )
            }
          >
            {route.icon}
          </NavLink>
        ))}
      </nav>
    )
  );
};

export default Navbar;
