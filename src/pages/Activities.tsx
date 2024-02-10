import React from 'react';

import useAuth from '@/hooks/useAuth';

import { formatMinutesAndHour, getCurrentDayFormated, getTimeSpan } from '@/services/date';

import Modal from '@/components/ui/Modal';
import ActivityForm from '@/components/ui/ActivityForm';
import useActivity from '@/hooks/useActivity';
import useForm from '@/hooks/useForm';
import ActivityCard from '@/components/activities/ActivityCard';
import Button from '@/components/ui/Button';

const date = new Date();

const ActivitiesPage: React.FC = () => {
  const { user } = useAuth();
  const { insertActivity, activities, getActivityList } = useActivity();
  const { getValues, setValues } = useForm();

  const [modalStatus, setModalStatus] = React.useState({ create: false });

  function openCreateModal() {
    setModalStatus({ create: true });

    const date = new Date();
    const totalMinutes = date.getHours() * 60 + date.getMinutes();

    setValues({ begin_time: formatMinutesAndHour(totalMinutes), end_time: '', description: '' });
  }

  function confirmCreate() {
    const { begin_time, end_time, description } = getValues();

    const timeSpan = getTimeSpan(begin_time, end_time);
    const dateID = getCurrentDayFormated(date);
    const createdDate = new Date();

    const [hours, minutes] = begin_time.split(':');

    createdDate.setHours(hours);
    createdDate.setMinutes(minutes);

    const params = {
      begin_time: begin_time,
      end_time: end_time,
      description: description,
      created_date: createdDate.toISOString(),
      time_span: timeSpan,
      date_id: dateID,
      user_id: user.id,
    };

    insertActivity(params)
      .then(response => {
        if (!response?.error) {
          setValues({
            begin_time: '',
            end_time: '',
            description: '',
          });
          setModalStatus({ create: false });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    const date = new Date();

    const dateID = getCurrentDayFormated(date);

    user.id && getActivityList(dateID);
  }, [user.id]);

  return (
    <section className="w-full my-2 mr-2 rounded-lg bg-gray-200">
      {/* selector of day - calendar */}
      Today is: {getCurrentDayFormated(date)}
      <Button shape="round" onClick={openCreateModal} appearance="primary">
        Add activity
      </Button>
      {user && activities.length ? (
        <>
          {activities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </>
      ) : null}
      <Modal
        isOpen={modalStatus.create}
        onClose={() => setModalStatus({ ...modalStatus, create: false })}
        className={'lg:w-4/12 md:w-8/12 sm:w-10/12 w-10/12'}
        onCancel={() => setModalStatus({ ...modalStatus, create: false })}
        onConfirm={confirmCreate}
        confirmText={'Create'}
        cancelButton={null}
      >
        <div className="mb-6">
          <ActivityForm />
        </div>
      </Modal>
    </section>
  );
};

export default ActivitiesPage;
