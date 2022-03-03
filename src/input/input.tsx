import React, { useContext } from 'react';
import classNames from '@pansy/classnames';
import { Input as AntInput } from 'antd';
import { ConfigContext } from '../config-provider';
import { Search } from './search';
import { Group } from './group';
import { Password } from './password';
import { TextArea } from './TextArea';

import type { InputProps } from 'antd/es/input';
import type { CompoundedComponent } from './types';

export const InternalInput: React.ForwardRefRenderFunction<AntInput, InputProps> = (
  { className, ...rest },
  ref
) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('input');

  return <AntInput {...rest} ref={ref} className={classNames(className, prefixCls)} />;
};

export const Input = React.forwardRef<unknown, InputProps>(InternalInput) as CompoundedComponent;

Input.displayName = 'Input';
Input.__SEN_INPUT = true;

Input.Group = Group;
Input.Search = Search;
Input.Password = Password;
Input.TextArea = TextArea;

export default Input;
