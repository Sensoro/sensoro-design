import React, { FC } from 'react';
import classnames from '@pansy/classnames';
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import './style/search.less';

const { Search } = Input;
const prefixCls = 'sen-input-search';

const InternalSearch: FC<SearchProps> = (props) => {
  const { className } = props;
  return <Search className={classnames(className, prefixCls)} {...props} />;
};

export default InternalSearch;
