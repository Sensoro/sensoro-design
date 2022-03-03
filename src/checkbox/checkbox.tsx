import React, { useContext } from 'react';
import classNames from '@pansy/classnames';
import { Checkbox as AntCheckbox } from 'antd';
import { ConfigContext } from '../config-provider';
import CheckboxGroup from './Group';

import type { CheckboxProps } from 'antd/es/checkbox';

export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>> {
  Group: typeof CheckboxGroup;
  __ANT_CHECKBOX: boolean;
}

const InternalCheckbox: React.ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  { className, ...rest },
  ref
) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('checkbox');

  return <AntCheckbox {...rest} ref={ref} className={classNames(className, prefixCls)} />;
};

const Checkbox = React.forwardRef<unknown, CheckboxProps>(InternalCheckbox) as CompoundedComponent;

Checkbox.displayName = 'Checkbox';
Checkbox.Group = CheckboxGroup;

export default Checkbox;
