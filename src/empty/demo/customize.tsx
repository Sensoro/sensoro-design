import React, { FC } from 'react';
import { Button } from 'antd';
import { Empty } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <Empty
      description={
        <span>
          Customize <a href="#API">Description</a>
        </span>
      }
    >
      <Button type="primary">Create Now</Button>
    </Empty>
  );
};

export default Example;
