import React from 'react';
import classNames from '@pansy/classnames';
import Radio, { RadioProps } from 'antd/es/radio';

const prefixCls = 'sen-radio';

const InputPlus: React.FC<RadioProps> = props => {
  const { className } = props;
  return (
    <Radio
      className={classNames(className, prefixCls)}
    />
  );
};

export default InputPlus;
