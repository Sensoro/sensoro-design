import React, { FC } from 'react';
import { DropdownSelect } from '@sensoro/sensoro-design';

const Example: FC = () => {
  const options = [
    { value: 1, title: '选项1' },
    { value: 2, title: '选项2' },
    { value: 3, title: '选项3' }
  ];

  return (
    <div>
      <DropdownSelect options={options} defaultValue={1}>
        {(text) => {
          return <span>{text}</span>;
        }}
      </DropdownSelect>
    </div>
  );
};

export default Example;
