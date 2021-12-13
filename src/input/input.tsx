import React, { FC } from 'react';
import classNames from '@pansy/classnames';
import { Input as AntInput } from 'antd';
import { InputProps } from 'antd/es/input';
import './style/index.less';

const prefixCls = 'sen-input';

const Input: FC<InputProps> = (props) => {
  const { className } = props;

  return <AntInput className={classNames(className, prefixCls)} {...props} />;
};

export default Input;
