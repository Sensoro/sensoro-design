import React, { useContext } from 'react';
import classnames from '@pansy/classnames';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { TextAreaRef } from 'antd/es/input/TextArea';
import { ConfigContext } from '../config-provider';

const InternalTextArea: React.ForwardRefRenderFunction<TextAreaRef, TextAreaProps> = (
  { className, ...rest },
  ref
) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('input-textarea');

  return <Input.TextArea className={classnames(className, prefixCls)} {...rest} ref={ref} />;
};

export const TextArea = React.forwardRef<unknown, TextAreaProps>(InternalTextArea);
