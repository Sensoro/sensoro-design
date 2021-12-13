import React, { FC } from 'react';
import { Radio } from '@sensoro/sensoro-design';

const BasicExample: FC = () => {
  const handleChange = (e) => {
    console.log(`radio = ${e.target.checked}`);
  };

  return (
    <div>
      <Radio onChange={handleChange}>Radio</Radio>
    </div>
  );
};

export default BasicExample;
