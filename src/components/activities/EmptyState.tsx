import React from 'react';
import Button from '@/components/ui/Button';
import EmptyStateIcon from '@/assets/icons/empty-state.svg?react';

const EmptyState: React.FC<{ openCreateModal: () => void }> = ({ openCreateModal }) => {
  return (
    <article className="text-center flex flex-col items-center bg-white max-w-fit mx-auto px-6 py-1 rounded-xl shadow-md absolute left-1/2 transform -translate-x-1/2 top-36 md:top-20 md:translate-y-1/2">
      <EmptyStateIcon />
      <h5 className=" font-medium text-gray-700 ">No tasks, yet</h5>
      <p className="text-gray-800 text-sm mt-2">
        No tasks in your timeline, yet! <br />
        Start adding to identify your free time span.
      </p>
      <Button onClick={openCreateModal} size="middle" shape="round" appearance="primary" className=" mt-3 mb-4">
        Create new
      </Button>
    </article>
  );
};

export default EmptyState;
