/**
 * title: 大小
 * desc: 大中小三种组合，可以和表单输入框进行对应配合。
 */
import React from 'react';
import { Space } from 'antd';
import { Radio } from '@sensoro/sensoro-design';

export default () => {
  return (
    <Space direction="vertical" size={16}>
      <Radio.Group defaultValue="a" size="large">
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
      <Radio.Group defaultValue="a" style={{ marginTop: 16 }}>
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
      <Radio.Group defaultValue="a" size="small" style={{ marginTop: 16 }}>
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
    </Space>
  );
};
