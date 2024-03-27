import React from 'react';
import './css/react-datepicker.css';

import { getAbbreviationDay, pad2Number } from '@/services/date';

import useDatePicker from '@/hooks/useDatePicker';

import Button from './Button';
import Calendar from './Calendar';

type DatePickerType = {
  openCreateModal: () => void;
};

const DatePicker: React.FC<DatePickerType> = ({ openCreateModal }) => {
  const { setCurrentDate, currentDate, surroundingDates } = useDatePicker();

  return (
    <div className="sticky top-0 z-10 bg-white  rounded-xl ring-1 ring-slate-300 shadow-sm">
      <aside className="flex items-start justify-between border-b border-b-gray-200 border-solid px-4 pt-3 pb-1">
        <div className="flex flex-col items-start">
          <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
        </div>
        <Button appearance="primary" shape="round" size="middle" onClick={openCreateModal}>
          + Add task
        </Button>
      </aside>
      <div className="flex items-center justify-around">
        {surroundingDates
          ? surroundingDates.map(date =>
              currentDate?.getDate() === date.getDate() ? (
                <div
                  key={pad2Number(date.getTime())}
                  className="inline-flex items-center gap-x-1.5 px-1.5 py-3 transition duration-200 flex-col bg-gray-900 rounded-3xl"
                >
                  <span className="text-gray-100 font-medium text-xs">{getAbbreviationDay(date.getDay())}</span>
                  <span className="relative w-8 h-8 grid place-content-center rounded-full font-medium  text-gray-100 ring-gray-300 before:absolute before:bg-gray-100 before:-bottom-1 before:left-1/2 before:w-1 before:h-1 before:rounded-full before:-translate-x-1/2">
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
                  <span className="w-8 h-8  grid place-content-center rounded-full font-medium">{date.getDate()}</span>
                </Button>
              )
            )
          : null}
      </div>
    </div>
  );
};

export default DatePicker;
