import React, { useContext } from 'react';
import classNames from '@pansy/classnames';
import { Input } from 'antd';
import { ConfigContext } from '../config-provider';
import type { GroupProps } from 'antd/es/input';

export const Group: React.FC<GroupProps> = ({ className, children, ...rest }) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('input-group');

  return (
    <Input.Group {...rest} className={classNames(className, prefixCls)}>
      {children}
    </Input.Group>
  );
};
