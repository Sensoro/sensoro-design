/**
 * title: 分组
 * desc: 用 OptGroup 进行选项分组。
 */
import React from 'react';
import { Select } from '@sensoro/sensoro-design';

const { Option, OptGroup } = Select;

export default () => {
  return (
    <div style={{ height: 180 }}>
      <Select defaultValue="lucy" open style={{ width: 200 }}>
        <OptGroup label="Manager">
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
        </OptGroup>
        <OptGroup label="Engineer">
          <Option value="Yiminghe">yiminghe</Option>
        </OptGroup>
      </Select>
    </div>
  );
};
