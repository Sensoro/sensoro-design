import React from 'react';
import { Select as AntSelect } from 'antd';
import { SelectProps } from 'antd/es/select';
import classnames from '@pansy/classnames';

const defaultPrefixCls = 'sen-select';
const defaultDropdownClassName = 'sen-select-dropdown';

const Select: React.FC<SelectProps<any>> = (props) => {
  const { className, prefixCls, dropdownClassName, children, ...restProps } = props;
  return (
    <AntSelect
      className={classnames(defaultPrefixCls, className)}
      prefixCls={prefixCls}
      dropdownClassName={dropdownClassName ?? defaultDropdownClassName}
      {...restProps}
    >
      {children}
    </AntSelect>
  );
};

export default Select;
