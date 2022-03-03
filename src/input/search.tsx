import React, { useContext } from 'react';
import classnames from '@pansy/classnames';
import { Input } from 'antd';
import { useBoolean } from '@pansy/react-hooks';
import { SearchProps } from 'antd/es/input';
import { ConfigContext } from '../config-provider';

const InternalSearch: React.ForwardRefRenderFunction<any, SearchProps> = (
  { className, ...rest },
  ref
) => {
  const [focused, focusedAction] = useBoolean();
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('input-search');

  return (
    <Input.Search
      className={classnames(className, prefixCls, {
        [`${prefixCls}-focused`]: focused
      })}
      {...rest}
      ref={ref}
      onFocus={() => {
        focusedAction.setTrue();
      }}
      onBlur={() => {
        focusedAction.setFalse();
      }}
    />
  );
};

export const Search = React.forwardRef<unknown, SearchProps>(InternalSearch);
