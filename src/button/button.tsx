import React, { FC } from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps } from 'antd/es/button';

const Button: FC<ButtonProps> = (props) => {
  return (
    <AntButton {...props} />
  )
}

export default Button;
