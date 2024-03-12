import React, { ReactNode, Ref, forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import ChevronIcon from '@/assets/icons/chevron.svg?react';

import { getMonthAndYear } from '@/services/date';

type CustomInputProps = {
  currentDate: Date;
  value?: ReactNode;
  onClick?: () => void;
};

type CalendarType = {
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  currentDate: Date;
};

const CustomInput = forwardRef(({ currentDate, onClick }: CustomInputProps, ref) => (
  <button
    className="inline-flex items-center gap-x-1.5 ring-1 ring-inset transition duration-200 rounded-md px-2 py-1.5 text-xs w-full bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 shadow-sm font-semibold"
    onClick={onClick}
    ref={ref as Ref<HTMLButtonElement>}
  >
    {getMonthAndYear(currentDate)} <ChevronIcon />
  </button>
));

const Calendar: React.FC<CalendarType> = ({ currentDate, setCurrentDate }) => {
  return (
    <ReactDatePicker
      todayButton="Go today"
      selected={currentDate}
      onChange={(date: Date) => setCurrentDate(date)}
      popperPlacement="top-end"
      customInput={<CustomInput currentDate={currentDate} />}
    />
  );
};

export default Calendar;
