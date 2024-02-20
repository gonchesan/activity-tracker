import React, { ReactNode } from 'react';
import { FormContextProps } from '@/interface/form';

export const FormContext = React.createContext<FormContextProps>(null);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = React.useState({});

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function getValues() {
    return formData;
  }

  function setValue(field: string, value: string | number | Date) {
    console.log(field, value);
    setFormData({ ...formData, [field]: value });
  }

  function setValues(values: any) {
    setFormData(values);
  }

  return (
    <FormContext.Provider value={{ formData, handleInputChange, getValues, setValue, setValues }}>
      {children}
    </FormContext.Provider>
  );
};
