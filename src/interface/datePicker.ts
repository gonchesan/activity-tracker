export type DatePickerContextProps = {
  currentDate: Date;
  surroundingDates: Date[] | undefined;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
} | null;
