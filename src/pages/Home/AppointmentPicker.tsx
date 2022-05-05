import { useState } from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useField, useFormikContext } from 'formik';
import { doctor } from '../../models/doctor.model';
import { hourFilterHelper } from '../../utils/dayFilterHelpers';

type AppointmentPickerProps = {
  name: string;
  bookingContent: any;
  doctors: doctor;
};

const AppointmentPicker = ({ name, bookingContent, doctors, ...otherProps }: AppointmentPickerProps) => {
  const [field, meta] = useField(name);
  const [value, setValue] = useState(moment());
  const { setFieldValue } = useFormikContext();

  const minTime = hourFilterHelper(doctors.opening_hours, value.format('ddd')).start;
  const maxTime = hourFilterHelper(doctors.opening_hours, value.format('ddd')).end;

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    value,
    onChange: (newValue: any) => {
      setFieldValue(field.name, newValue);
      setValue(newValue);
    },
    renderInput: (params: any) => (
      <>
        <TextField {...field} {...params} />
        {meta && meta.touched && meta.error && <span>{meta.error}</span>}
      </>
    ),
    minDate: moment().isAfter(moment(maxTime, 'H:m').subtract(59, 'minutes')) ? moment().add(1, 'days') : moment(),
    minTime: moment(minTime, 'H:m'),
    maxTime: moment(maxTime, 'H:m').subtract(59, 'minutes'),
    minutesStep: 30
  };

  return <DateTimePicker {...configDateTimePicker} />;
};

export default AppointmentPicker;
