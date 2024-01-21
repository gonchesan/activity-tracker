import React from 'react';
import TimeField from 'react-simple-timefield';

import useForm from '@/hooks/useForm';

const ActivityForm: React.FC = () => {
    const { formData, handleInputChange } = useForm();

    const { begin_time, end_time, description } = formData;

    return (
        formData && (
            <div className="mt-4 grid grid-cols-4 gap-4 grid-flow-row-dense">
                <div className="col-span-4">
                    <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                        Description
                    </label>
                    <div className="mt-2.5">
                        <textarea
                            rows={3}
                            className="col-span-4 w-full px-2 py-2 resize-none  block rounded-md  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  outline-none"
                            placeholder="Activity description"
                            value={description}
                            name="description"
                            onChange={handleInputChange}
                            autoFocus
                        />
                    </div>
                </div>
                <div className="sm:col-span-4 md:col-span-4 lg:col-span-2 relative">
                    <label htmlFor="begin_time" className="block text-sm font-semibold leading-6 text-gray-900">
                        Begin time
                    </label>
                    <div className="mt-2.5">
                        <TimeField
                            value={begin_time}
                            onChange={handleInputChange}
                            input={
                                <input
                                    className="col-span-2 w-full border border-slate-200 rounded-md px-10 py-2 ring-1 ring-inset ring-gray-300 focus:ring-indigo-600 focus:ring-2 focus:ring-inset outline-none"
                                    value={begin_time}
                                    name="begin_time"
                                    type="text"
                                />
                            }
                            showSeconds={false}
                        />
                    </div>
                    <span
                        className="absolute inset-y-0 left-0 pl-3 pt-8 
                    flex items-center  
                    pointer-events-none"
                    >
                        <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="currentColor"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM280 120V256c0 13.3-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24h80V120c0-13.3 10.7-24 24-24s24 10.7 24 24z"
                            />
                        </svg>
                    </span>
                </div>
                <div className="sm:col-span-4 md:col-span-4 lg:col-span-2 relative">
                    <label htmlFor="end_time" className="block text-sm font-semibold leading-6 text-gray-900">
                        End time
                    </label>
                    <div className="mt-2.5">
                        <TimeField
                            value={end_time}
                            onChange={handleInputChange}
                            input={
                                <input
                                    className="col-span-2 w-full border border-slate-200 rounded-md px-10 py-2"
                                    value={end_time}
                                    name="end_time"
                                    type="text"
                                />
                            }
                            showSeconds={false}
                        />
                    </div>
                    <span
                        className="absolute inset-y-0 left-0 pl-3 pt-8 
                    flex items-center  
                    pointer-events-none"
                    >
                        <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="currentColor"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        )
    );
};

export default ActivityForm;
