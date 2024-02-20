import React from 'react';
import { DatePickerContext } from '@/context/DatePickerContext';

export default function useDatePicker() {
  const datePickerContext = React.useContext(DatePickerContext);

  if (!datePickerContext) throw new Error('DatePickerContext need a Provider');
  return datePickerContext;
}
