import React, { FC } from 'react';
import { Cascader as AntCascader } from 'antd';
import { CascaderProps } from 'antd/es/cascader';

const Cascader: FC<CascaderProps> = (props) => {
  return (
    <AntCascader {...props} />
  )
}

export default Cascader
