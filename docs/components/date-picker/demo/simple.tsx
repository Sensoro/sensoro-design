import React, { FC } from 'react';
import { DatePicker } from '@sensoro/sensoro-design';

const BasicExample: FC = () => {
  const handleChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <DatePicker onChange={handleChange} />
    </div>
  );
};

export default BasicExample;
