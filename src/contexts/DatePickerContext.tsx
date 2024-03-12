import React, { ReactNode } from 'react';
import { DatePickerContextProps } from '@/models/datePicker';

export const DatePickerContext = React.createContext<DatePickerContextProps>(null);

function getSurroundingDates(currentDate: Date) {
  const surroundingDates = [];

  for (let i = -2; surroundingDates.length < 5; i++) {
    let date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    surroundingDates.push(date);
  }

  return surroundingDates;
}

export const DatePickerProvider = ({ children }: { children: ReactNode }) => {
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const [surroundingDates, setSurroundingDates] = React.useState<Date[]>();

  React.useEffect(() => {
    if (currentDate) {
      setSurroundingDates(getSurroundingDates(currentDate));
    }
  }, [currentDate]);
  return (
    <DatePickerContext.Provider value={{ currentDate, surroundingDates, setCurrentDate }}>
      {children}
    </DatePickerContext.Provider>
  );
};
