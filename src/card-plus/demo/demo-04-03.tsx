import React from 'react';
import { CardPlus } from '@sensoro/sensoro-design';

export default () => {
  return (
    <CardPlus title="复杂切分" extra="2019年9月28日" split="vertical" bordered headerBordered>
      <CardPlus split="horizontal">
        <CardPlus split="horizontal">
          <CardPlus split="vertical">
            <CardPlus title="昨日全部流量">123</CardPlus>
            <CardPlus title="本月累计流量">234</CardPlus>
            <CardPlus title="今年累计流量">345</CardPlus>
          </CardPlus>
          <CardPlus split="vertical">
            <CardPlus title="运行中试验">12/56</CardPlus>
            <CardPlus title="历史试验总数">134 个</CardPlus>
          </CardPlus>
        </CardPlus>
        <CardPlus title="流量趋势">
          <div>图表</div>
          <div>图表</div>
          <div>图表</div>
          <div>图表</div>
          <div>图表</div>
        </CardPlus>
      </CardPlus>
      <CardPlus title="流量占用情况">右侧内容</CardPlus>
    </CardPlus>
  );
};
