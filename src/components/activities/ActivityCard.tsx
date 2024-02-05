import { Activity } from '@/interface/activity';
import { dateService } from '@/services/date';
import React from 'react';
import Button from '@/components/ui/Button';
import useForm from '@/hooks/useForm';
import Modal from '../ui/Modal';
import ActivityForm from '../ui/ActivityForm';
import useActivity from '@/hooks/useActivity';

type ActivityCardProps = { activity: Activity };

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    const { id, begin_time, description, end_time, time_span, category } = activity;

    // TODO Add function in the date service to add AM or PM
    // TODO create Icon component https://www.sanity.io/guides/import-svg-files-in-react
    // TODO create label by category
    // TODO create ... button

    const { getValues, setValues } = useForm();
    const { deleteActivity, editActivity, getActivityList, activities } = useActivity();

    const [openDropdown, setOpenDropdown] = React.useState(false);
    const [activitySelected, setActivitySelected] = React.useState<Activity>();
    const [modalStatus, setModalStatus] = React.useState({ edit: false, delete: false });

    function openEditModal(activity: Activity) {
        setOpenDropdown(false);
        setActivitySelected(activity);
        const { begin_time, end_time, description } = activity;
        setValues({ begin_time: begin_time, end_time: end_time, description: description });
        setModalStatus({ ...modalStatus, edit: true });
    }

    function openDeleteModal(activity: Activity) {
        setOpenDropdown(false);
        setActivitySelected(activity);
        setModalStatus({ ...modalStatus, delete: true });
    }

    function confirmDelete() {
        setModalStatus({ ...modalStatus, delete: false });
        deleteActivity(activitySelected!.id);
    }
    function confirmEdit() {
        editActivity(getValues(), activitySelected!.id)
            .then(response => {
                if (!response?.error) {
                    setModalStatus({ ...modalStatus, edit: false });
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm py-2 px-4 max-w-72 mb-2 relative after:absolute after:top-[calc(100%/6)] after:left-0  after:border-l-4 after:border-blue-500 after:border-t-transparent after:border-t-solid after:border-t-4 after:border-b-transparent after:border-b-solid after:border-b-4 after:h-4/6">
                <aside className="relative">
                    <div className="absolute right-0 origin-top-right text-right">
                        <button
                            className=" inline-flex justify-center gap-x-1.5 rounded-full bg-transparent px-2 py-2 text-sm font-semibold text-gray-500 shadow-sm hover:ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition duration-300"
                            onClick={() => setOpenDropdown(!openDropdown)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4 w-4">
                                <path
                                    fill="currentColor"
                                    d="M432 256a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zm-160 0a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zM64 304a48 48 0 1 1 0-96 48 48 0 1 1 0 96z"
                                />
                            </svg>
                        </button>

                        <dialog
                            className="z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            open={openDropdown}
                        >
                            <div className="py-1" role="none">
                                <button className="text-gray-700 block px-4 py-2 text-sm" onClick={() => openEditModal(activity)}>
                                    Edit
                                </button>
                                <button className="text-gray-700 block px-4 py-2 text-sm" onClick={() => openDeleteModal(activity)}>
                                    Delete
                                </button>
                            </div>
                        </dialog>
                    </div>

                    <span
                        className="uppercase text-[10.5px] font-medium bg-blue-200 text-blue-600 px-2.5 py-1 rounded-full
                "
                    >
                        {category}
                    </span>
                    <h2 className="text-lg font-semibold">{description}</h2>
                    <hr className="border-t border-solid border-slate-300 my-2" />
                </aside>
                <div>
                    <span className="flex items-center gap-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4">
                            <path
                                fill="currentColor"
                                d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                            />
                        </svg>
                        {dateService.formatWithOurPeriods(begin_time)} - {dateService.formatWithOurPeriods(end_time)}
                    </span>
                    <span className="flex items-center gap-2 text-blue-600 font-medium text-sm" title="Time span">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=" h-4 w-4">
                            <path
                                fill="currentColor"
                                d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                            />
                        </svg>

                        {dateService.formatMinutesAndHour(time_span, true)}
                    </span>
                </div>
            </div>
            {/* //?Modals components */}
            <Modal
                isOpen={modalStatus.delete}
                onClose={() => setModalStatus({ ...modalStatus, delete: false })}
                className={'lg:w-4/12 md:w-8/12 sm:w-10/12 w-10/12'}
                onCancel={() => setModalStatus({ ...modalStatus, delete: false })}
                onConfirm={confirmDelete}
                confirmText={'Delete'}
            >
                <p>Are you sure you want to delete this activity?</p>
            </Modal>
            <Modal
                isOpen={modalStatus.edit}
                onClose={() => setModalStatus({ ...modalStatus, edit: false })}
                className={'lg:w-4/12 md:w-8/12 sm:w-10/12 w-10/12'}
                onCancel={() => setModalStatus({ ...modalStatus, edit: false })}
                onConfirm={confirmEdit}
                confirmText={'Update'}
                confirmClassName={'bg-amber-500'}
                cancelButton={null}
            >
                <div className="mb-6">
                    <ActivityForm />
                </div>
            </Modal>
        </>
    );
};

export default ActivityCard;
