import React from 'react';
import { Tabs } from 'antd';
import { CardPlus } from '@sensoro/sensoro-design';

const { TabPane } = Tabs;

export default () => {
  return (
    <CardPlus bordered>
      <Tabs tabPosition="left">
        <TabPane tab="Tab 1" key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </CardPlus>
  );
};
