import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { ScrollableBar } from '@sensoro/sensoro-design';

const defaultData = [1, 2, 3];

export default () => {
  const [data, setData] = useState(defaultData);

  const handleAddClick = () => {
    setData([...data, data.length + 1]);
  };

  const handleResetClick = () => {
    setData(defaultData);
  };

  return (
    <div>
      <Space>
        <Button onClick={handleAddClick}>添加</Button>
        <Button onClick={handleResetClick}>重置</Button>
      </Space>
      <br />
      <br />
      <ScrollableBar
        key="ScrollableBar-01"
        className="scrollable-bar-demo-01"
        style={{
          width: 400
        }}
      >
        {data.map((item, index) => {
          return (
            <ScrollableBar.Item style={{ padding: '0 10px' }} key={`item-${index}`}>
              helloworld{item}
            </ScrollableBar.Item>
          );
        })}
      </ScrollableBar>

      <ScrollableBar
        key="ScrollableBar-02"
        className="scrollable-bar-demo-02"
        style={{
          width: 500
        }}
      >
        {data.map((item, index) => {
          return (
            <ScrollableBar.Item style={{ padding: '0 10px' }} key={`item-${index}`}>
              helloworld{item}
            </ScrollableBar.Item>
          );
        })}
      </ScrollableBar>
    </div>
  );
};
