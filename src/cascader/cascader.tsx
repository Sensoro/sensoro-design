import React from 'react';
import { Cascader as AntCascader } from 'antd';
import { CascaderProps } from 'antd/es/cascader';

const Cascader: React.FC<CascaderProps<any>> = (props) => {
  return <AntCascader {...props} />;
};

export default Cascader;
