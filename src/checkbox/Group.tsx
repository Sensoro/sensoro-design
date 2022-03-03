import React, { useContext } from 'react';
import { Checkbox } from 'antd';
import classNames from '@pansy/classnames';
import { ConfigContext } from '../config-provider';

import type { CheckboxGroupProps } from 'antd/es/checkbox';

const InternalCheckboxGroup: React.ForwardRefRenderFunction<HTMLDivElement, CheckboxGroupProps> = (
  { className, ...rest },
  ref
) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('checkbox-group');

  return <Checkbox.Group {...rest} ref={ref} className={classNames(prefixCls, className)} />;
};

const CheckboxGroup = React.forwardRef<HTMLElement, CheckboxGroupProps>(InternalCheckboxGroup);

export default React.memo(CheckboxGroup);
