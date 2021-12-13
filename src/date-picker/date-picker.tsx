import React, { FC } from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';

const DatePicker: FC<DatePickerProps> = (props) => {
  return <AntDatePicker {...props} />;
};

export default DatePicker;
