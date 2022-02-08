import React, { FC } from 'react';
import { Checkbox } from '@sensoro/sensoro-design';

const BasicExample: FC = () => {
  const handleChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div>
      <Checkbox onChange={handleChange}>Checkbox</Checkbox>
    </div>
  );
};

export default BasicExample;
