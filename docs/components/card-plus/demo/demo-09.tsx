import React from 'react';
import { Button } from 'antd';
import { CardPlus } from '@sensoro/sensoro-design';

export default () => {
  return (
    <>
      <CardPlus loading style={{ width: 300 }}>
        内容 <br />
        内容 <br />
        内容 <br />
        内容 <br />
        <Button type="primary">操作</Button>
      </CardPlus>
    </>
  );
};
