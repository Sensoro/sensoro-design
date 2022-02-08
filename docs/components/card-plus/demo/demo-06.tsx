import React from 'react';
import { CardPlus } from '@sensoro/sensoro-design';

export default () => {
  return (
    <CardPlus title="标题" extra="extra" style={{ width: 300 }} headerBordered>
      内容
    </CardPlus>
  );
};
