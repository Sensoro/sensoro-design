import React from 'react';
import { CardPlus } from '@sensoro/sensoro-design';

export default () => {
  return (
    <CardPlus title="左右分栏带标题" extra="2019年9月28日" split="vertical" bordered headerBordered>
      <CardPlus title="左侧详情" colSpan="30%">
        左侧内容
      </CardPlus>
      <CardPlus title="流量占用情况">
        <div style={{ height: 360 }}>右侧内容</div>
      </CardPlus>
    </CardPlus>
  );
};
