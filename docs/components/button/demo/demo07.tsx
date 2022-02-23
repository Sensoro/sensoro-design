/**
 * title: 分组按钮
 * desc:
 *   分组按钮使用时，推荐使用 1 个主操作 + n 个次操作; <br />
 *   按钮排列：按钮左对齐，主按钮展示在左侧第一个，按钮右对齐，主按钮展示在右侧第一个; <br />
 *   超过3个按钮时，完整展示前两个按钮，后面的按钮折叠收起; <br />
 */
import React from 'react';
import { Space, Row, Col, Typography } from 'antd';
import { Button } from '@sensoro/sensoro-design';

const { Title } = Typography;

export default () => {
  return (
    <Row>
      <Col span={12}>
        <Title level={5}>左对齐</Title>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Button.Group>
            <Button>主要按钮</Button>
            <Button disabled>次要按钮1</Button>
            <Button>次要按钮2</Button>
          </Button.Group>
          <Button.Group
            onClick={(key) => {
              console.log(key);
            }}
          >
            <Button>主要按钮</Button>
            <Button key="create">次要按钮1</Button>
            <Button key="update">次要按钮2</Button>
            <Button>次要按钮3</Button>
            <Button disabled>次要按钮4</Button>
          </Button.Group>
        </Space>
      </Col>
      <Col span={12}>
        <Title level={5}>右对齐</Title>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Button.Group type="right">
            <Button>主要按钮</Button>
            <Button>次要按钮1</Button>
            <Button>次要按钮2</Button>
          </Button.Group>
          <Button.Group
            type="right"
            onClick={(key) => {
              console.log(key);
            }}
          >
            <Button>主要按钮</Button>
            <Button key="create">次要按钮1</Button>
            <Button key="update">次要按钮2</Button>
            <Button>次要按钮3</Button>
            <Button>次要按钮4</Button>
          </Button.Group>
        </Space>
      </Col>
    </Row>
  );
};
