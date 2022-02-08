import React, { FC } from 'react';
import { Input } from '@sensoro/sensoro-design';
const { Search } = Input;
const BasicExample: FC = () => {
  return (
    <div>
      <Input placeholder="Basic usage" style={{ width: 200 }} />
      <br />
      <br />
      <br />
      <Search style={{ width: 200 }} />
    </div>
  );
};

export default BasicExample;
