/**
 * title: 输入框组合
 * desc: 输入框的组合展现。
 */
import React from 'react';
import { Space, Row, Col, Select } from 'antd';
import { Input } from '@sensoro/sensoro-design';

const { Option } = Select;

export default () => {
  return (
    <Space direction="vertical" size={16}>
      <Input.Group size="large">
        <Row gutter={8}>
          <Col span={5}>
            <Input defaultValue="0571" />
          </Col>
          <Col span={8}>
            <Input defaultValue="26888888" />
          </Col>
        </Row>
      </Input.Group>
      <Input.Group compact>
        <Input style={{ width: '20%' }} defaultValue="0571" />
        <Input style={{ width: '30%' }} defaultValue="26888888" />
      </Input.Group>
      <Input.Group compact>
        <Select defaultValue="Zhejiang">
          <Option value="Zhejiang">Zhejiang</Option>
          <Option value="Jiangsu">Jiangsu</Option>
        </Select>
        <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
      </Input.Group>
    </Space>
  );
};
