import React from 'react';
import ActivityForm from '../ui/ActivityForm';

import { dateService } from '@/services/date';
import Modal from '../ui/Modal';
import { Activity } from '@/interface/activity';

import useAuth from '@/hooks/useAuth';
import useActivity from '@/hooks/useActivity';
import useForm from '@/hooks/useForm';
import ActivityCard from './ActivityCard';

const Table: React.FC = () => {
    const { user } = useAuth();
    const { deleteActivity, editActivity, getActivityList, activities } = useActivity();
    const { getValues, setValues } = useForm();
    const [modalStatus, setModalStatus] = React.useState({ edit: false, delete: false });
    const [activitySelected, setActivitySelected] = React.useState<Activity>();

    function confirmDelete() {
        setModalStatus({ ...modalStatus, delete: false });
        deleteActivity(activitySelected!.id);
    }
    function openDeleteModal(activity: Activity) {
        setActivitySelected(activity);
        setModalStatus({ ...modalStatus, delete: true });
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
    function openEditModal(activity: Activity) {
        setActivitySelected(activity);
        const { begin_time, end_time, description } = activity;
        setValues({ begin_time: begin_time, end_time: end_time, description: description });
        setModalStatus({ ...modalStatus, edit: true });
    }

    React.useEffect(() => {
        const date = new Date();

        const dateID = dateService.getCurrentDayFormated(date);

        user.id && getActivityList(dateID);
    }, [user.id]);

    return (
        <>
            <table className="table-auto border-collapse border border-slate-500 mt-4">
                <thead>
                    <tr>
                        <th className="border border-slate-600 ">Begin time</th>
                        <th className="border border-slate-600">End time</th>
                        <th className="border border-slate-600">Activity</th>
                        <th className="border border-slate-600">Time span</th>
                        <th className="border border-slate-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {activities &&
                        activities.map(activity => {
                            const { id, begin_time, description, end_time, time_span } = activity;
                            return (
                                <ActivityCard key={id} activity={activity} />
                                // <tr key={id}>
                                //     <td className="border border-slate-700 text-center">{begin_time}</td>
                                //     <td className="border border-slate-700 text-center">{end_time}</td>
                                //     <td className="border border-slate-700">{description}</td>
                                //     <td className="border border-slate-700 text-center">{dateService.formatMinutesAndHour(time_span)}</td>
                                //     <td className="border border-slate-700">
                                //         <button className=" py-1.5 px-2 rounded-lg bg-amber-500" onClick={() => openEditModal(activity)}>
                                //             Edit
                                //         </button>
                                //         <button
                                //             className=" py-1.5 px-2 rounded-lg bg-red-700 text-white"
                                //             onClick={() => openDeleteModal(activity)}
                                //         >
                                //             Delete
                                //         </button>
                                //     </td>
                                // </tr>
                            );
                        })}
                </tbody>
            </table>

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

export default Table;
