import React, { useContext } from 'react';
import { Radio } from 'antd';
import { ConfigContext } from '../config-provider';

import type { RadioGroupProps } from 'antd/es/radio';

const InternalRadioGroup: React.ForwardRefRenderFunction<HTMLDivElement, RadioGroupProps> = (
  props,
  ref
) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('radio');

  return <Radio.Group {...props} ref={ref} prefixCls={prefixCls} />;
};

const RadioGroup = React.forwardRef<HTMLElement, RadioGroupProps>(InternalRadioGroup);

export default React.memo(RadioGroup);
