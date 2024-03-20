import React from 'react';
import './css/react-datepicker.css';

import { getAbbreviationDay, pad2Number } from '@/services/date';

import ChevronLeftIcon from '@/assets/icons/chevrons-left.svg?react';
import ChevronRigthIcon from '@/assets/icons/chevrons-right.svg?react';

import useDatePicker from '@/hooks/useDatePicker';

import Button from './Button';
import Calendar from './Calendar';

type DatePickerType = {
  openCreateModal: () => void;
};

const DatePicker: React.FC<DatePickerType> = ({ openCreateModal }) => {
  const { setCurrentDate, currentDate, surroundingDates } = useDatePicker();

  function shiftCurrentDate(direction: 'forward' | 'backward') {
    const daysToAdd = direction === 'forward' ? 1 : -1;
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + daysToAdd)));
  }

  return (
    <div className="sticky top-0 z-30 bg-white  rounded-xl ring-1 ring-slate-300 shadow-sm">
      <aside className="flex items-start justify-between border-b border-b-gray-200 border-solid px-4 pt-3 pb-1">
        <div className="flex flex-col items-start">
          <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
        </div>
        <Button appearance="primary" shape="round" size="middle" onClick={openCreateModal}>
          + Add task
        </Button>
      </aside>
      <div className="flex items-center justify-around">
        <Button
          onClick={() => shiftCurrentDate('backward')}
          shape="round"
          appearance="link"
          icon={<ChevronLeftIcon />}
        />

        {surroundingDates
          ? surroundingDates.map(date =>
              currentDate?.getDate() === date.getDate() ? (
                <div
                  key={pad2Number(date.getTime())}
                  className="inline-flex items-center gap-x-1.5 px-3 py-2 transition duration-200 flex-col"
                >
                  <span className="text-gray-900 font-medium text-xs">{getAbbreviationDay(date.getDay())}</span>
                  <span className="w-8 h-8 grid place-content-center rounded-full font-medium bg-teal-600 text-gray-100 ring-gray-300">
                    {date.getDate()}
                  </span>
                </div>
              ) : (
                <Button
                  key={pad2Number(date.getTime())}
                  className="flex-col"
                  appearance="text"
                  onClick={() => setCurrentDate(date)}
                >
                  <span className="text-gray-400 font-medium text-xs">{getAbbreviationDay(date.getDay())}</span>
                  <span className="w-8 h-8 bg-slate-300 grid place-content-center rounded-full font-medium">
                    {date.getDate()}
                  </span>
                </Button>
              )
            )
          : null}
        <Button
          onClick={() => shiftCurrentDate('forward')}
          shape="round"
          appearance="link"
          icon={<ChevronRigthIcon />}
        />
      </div>
    </div>
  );
};

export default DatePicker;
