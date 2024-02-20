export type FormContextProps = {
  formData: any;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  getValues(): any;
  setValue(field: string, value: string | number | Date): void;
  setValues(values: any): void;
} | null;
