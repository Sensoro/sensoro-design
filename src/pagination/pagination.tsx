import React, { useContext } from 'react';
import classNames from '@pansy/classnames';
import { Pagination as AntPagination } from 'antd';
import { ConfigContext } from '../config-provider';

import type { PaginationProps } from 'antd/es/pagination';

export const Pagination: React.FC<PaginationProps> = ({ className, ...rest }) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pagination');

  return <AntPagination {...rest} className={classNames(prefixCls, className)} />;
};
