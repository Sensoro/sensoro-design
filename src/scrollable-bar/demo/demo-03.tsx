import React, { useState, useRef } from 'react';
import { Button, Space } from 'antd';
import { ScrollableBar } from '@sensoro/sensoro-design';
// @ts-ignore
import { ScrollableBarRef } from '@sensoro/sensoro-design/es/scrollable-bar';

const defaultData = [1, 2, 3];

export default () => {
  const [data, setData] = useState(defaultData);
  const scrollableBarRef = useRef<ScrollableBarRef>();

  const handleAddClick = () => {
    setData([...data, data.length + 1]);
  };

  const handleReset = () => {
    scrollableBarRef.current?.reset?.();
  };

  const handlePrev = () => {
    scrollableBarRef.current?.prev?.();
  };

  const handleNext = () => {
    scrollableBarRef.current?.next?.();
  };

  return (
    <div>
      <Space>
        <Button onClick={handleAddClick}>添加</Button>
        <Button onClick={handleReset}>滚动到初始位置</Button>
        <Button onClick={handlePrev}>上一页</Button>
        <Button onClick={handleNext}>下一页</Button>
      </Space>
      <br />
      <br />
      <ScrollableBar
        key="ScrollableBar-02"
        className="scrollable-bar-demo-02"
        style={{
          width: 500
        }}
        ref={scrollableBarRef}
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
