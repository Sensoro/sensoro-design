import React, { FC } from 'react';
import classNames from '@pansy/classnames';
import { Tabs as AntTabs } from 'antd';
import { TabsProps as AntTabsProps } from 'antd/es/tabs';

interface TabsProps extends AntTabsProps {}

const { TabPane } = AntTabs;

export interface TabsType extends FC<TabsProps> {
  TabPane: typeof import('rc-tabs').TabPane;
}

const prefixCls = 'sen-tabs';

const Tabs: TabsType = (props) => {
  const { className, ...rest } = props;

  return (
    <AntTabs
      {...rest}
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
    />
  );
};

Tabs.TabPane = TabPane;

export default Tabs;
