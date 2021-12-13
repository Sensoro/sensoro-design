import React, { FC } from 'react';
import { Popmodal } from '@sensoro/sensoro-design';
import { Button } from 'antd';

const BasicExample: FC = () => {
  return (
    <Popmodal
      footerBorder
      okText="保存"
      cancelText="取消"
      content={<div style={{ width: 200 }}>123</div>}
    >
      <Button type="primary">点击</Button>
    </Popmodal>
  );
};

export default BasicExample;
