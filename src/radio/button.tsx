import React, { useContext } from 'react';
import { Radio } from 'antd';
import { ConfigContext } from '../config-provider';

import type { RadioButtonProps } from 'antd/es/radio/radioButton';

const InternalRadioButton: React.ForwardRefRenderFunction<HTMLDivElement, RadioButtonProps> = (
  props,
  ref
) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('radio-button');

  return <Radio.Button {...props} ref={ref} prefixCls={prefixCls} />;
};

export default React.forwardRef<HTMLElement, RadioButtonProps>(InternalRadioButton);
