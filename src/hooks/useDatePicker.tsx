import React from 'react';
import { DatePickerContext } from '@/contexts/DatePickerContext';

export default function useDatePicker() {
  const datePickerContext = React.useContext(DatePickerContext);

  if (!datePickerContext) throw new Error('DatePickerContext need a Provider');
  return datePickerContext;
}
