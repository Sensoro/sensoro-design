import React, { FC } from 'react';
import PlusOutlined from '@sensoro-design/icons/PlusOutlined';
import { Tag } from '@sensoro/sensoro-design';

const BasicExample: FC = () => {
  return (
    <div>
      <Tag multicolor icon={<PlusOutlined />} color="#2db7f5">
        Tag1
      </Tag>
    </div>
  );
};

export default BasicExample;
