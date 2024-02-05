import React from 'react';
import useAuth from '@/hooks/useAuth';

const Sidebar: React.FC = () => {
    const { signOut, user } = useAuth();

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
            <aside className=" bg-sky-950 h-[calc(100%-1rem)] rounded-lg m-2 z-10 flex flex-col justify-between">
                <button className="p-3 m-3 text-teal-600">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path
                            fill="currentColor"
                            d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                        />
                    </svg>
                </button>
                <button className="p-3 m-3 text-white hover:text-teal-600 transition duration-200" title="Sign out" onClick={signOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4">
                        <path
                            fill="currentColor"
                            d="M352 146.2L462 256 352 365.8l0-53.8c0-13.3-10.7-24-24-24l-120 0 0-64 120 0c13.3 0 24-10.7 24-24l0-53.8zM512 256c0-11.5-4.6-22.5-12.7-30.6L383.2 109.6c-8.7-8.7-20.5-13.6-32.8-13.6c-25.6 0-46.4 20.8-46.4 46.4l0 33.6-96 0c-26.5 0-48 21.5-48 48l0 64c0 26.5 21.5 48 48 48l96 0 0 33.6c0 25.6 20.8 46.4 46.4 46.4c12.3 0 24.1-4.9 32.8-13.6L499.3 286.6c8.1-8.1 12.7-19.1 12.7-30.6zM168 80c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 32C39.4 32 0 71.4 0 120L0 392c0 48.6 39.4 88 88 88l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l80 0z"
                        />
                    </svg>
                </button>
            </aside>
        )
    );
};

export default Sidebar;
