import React from 'react';
import { CardPlus } from '@sensoro/sensoro-design';

export default () => {
  return (
    <CardPlus split="vertical" bordered headerBordered>
      <CardPlus title="左侧详情" colSpan="30%">
        左侧内容
      </CardPlus>
      <CardPlus title="左右分栏子卡片带标题" headerBordered>
        <div style={{ height: 360 }}>右侧内容</div>
      </CardPlus>
    </CardPlus>
  );
};
