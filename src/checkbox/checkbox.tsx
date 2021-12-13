import React, { FC } from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import { CheckboxProps } from 'antd/es/checkbox';

const Checkbox: FC<CheckboxProps> = (props) => {
  return (
    <AntCheckbox {...props} />
  )
}

export default Checkbox
