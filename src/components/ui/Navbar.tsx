// import { useAuth } from '@/context/AuthContext';
import useAuth from '@/hooks/useAuth';
import React from 'react';

const Navbar: React.FC = () => {
    const { signOut, user } = useAuth();

    return user ? (
        <nav className="fixed flex-no-wrap flex w-full py-3 items-center justify-between bg-[#FBFBFB]  shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-2">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <button
                    className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                    type="button"
                    data-te-collapse-init
                    data-te-target="#navbarSupportedContent1"
                    aria-controls="navbarSupportedContent1"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="[&>svg]:w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                            <path
                                fillRule="evenodd"
                                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </button>

                <div
                    className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                    id="navbarSupportedContent1"
                    data-te-collapse-item
                >
                    <a
                        className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                        href="#"
                    >
                        <img
                            src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                            style={{ height: '15px' }}
                            alt="TE Logo"
                            loading="lazy"
                        />
                    </a>
                </div>

                <div className="relative flex items-center">
                    <button
                        onClick={signOut}
                        className="flex items-center px-3 py-1 justify-center rounded-md bg-indigo-600 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign out
                    </button>
                    {/* <div
            className="relative"
            data-te-dropdown-ref
            data-te-dropdown-alignment="end"
          >
            <a
              className="hidden-arrow mr-4 flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
              href="#"
              id="dropdownMenuButton1"
              role="button"
              data-te-dropdown-toggle-ref
              aria-expanded="false"
            >
              <span className="[&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="absolute -mt-4 ml-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                1
              </span>
            </a>
          </div> */}

                    <div className="relative" data-te-dropdown-ref data-te-dropdown-alignment="end">
                        <button
                            className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                            id="dropdownMenuButton2"
                            role="button"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false"
                        >
                            {user.picture ? (
                                <img
                                    src={user.picture}
                                    className="rounded-full"
                                    style={{ height: '25px', width: '25px' }}
                                    alt=""
                                    loading="lazy"
                                />
                            ) : (
                                <div className="rounded-full w-[30px] h-[30px] bg-indigo-400 text-white grid place-content-center">
                                    {user.email?.toUpperCase()[0]}
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    ) : null;
};

export default Navbar;
