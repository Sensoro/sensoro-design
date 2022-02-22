import React, { useContext } from 'react';
import { Radio as AntRadio } from 'antd';
import { ConfigContext } from '../config-provider';

import type { RadioProps } from 'antd/es/radio';

const InternalRadio: React.ForwardRefRenderFunction<HTMLElement, RadioProps> = (props, ref) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('radio');

  return <AntRadio prefixCls={prefixCls} {...props} ref={ref} />;
};

const Radio = React.forwardRef<unknown, RadioProps>(InternalRadio);

Radio.displayName = 'Radio';

export default Radio;
