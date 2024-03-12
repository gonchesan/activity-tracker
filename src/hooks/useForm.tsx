import { FormContext } from '@/contexts/FormContext';
import React from 'react';

export default function useForm() {
  const formContext = React.useContext(FormContext);

  if (!formContext) throw new Error('FormContext need a Provider');
  return formContext;
}
