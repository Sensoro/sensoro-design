import React, { useContext } from 'react';
import classnames from '@pansy/classnames';
import { Select as AntSelect } from 'antd';
import { ConfigContext } from '../config-provider';

import type { SelectProps } from 'antd/es/select';
import type { CompoundedComponent } from './types';

export const InternalSelect: React.ForwardRefRenderFunction<any, SelectProps> = (
  { className, children, dropdownClassName, ...restProps },
  ref
) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('select');

  return (
    <AntSelect
      {...restProps}
      ref={ref}
      className={classnames(prefixCls, className)}
      dropdownClassName={classnames(`${prefixCls}-dropdown`, dropdownClassName)}
    >
      {children}
    </AntSelect>
  );
};

const Select = React.forwardRef<unknown, SelectProps>(InternalSelect) as CompoundedComponent;

Select.displayName = 'Input';
Select.__SEN_SELECT = true;

Select.OptGroup = AntSelect.OptGroup;
Select.Option = AntSelect.Option;

export default Select;
