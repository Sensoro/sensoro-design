import React from 'react';
import { Line as LineData } from '../../types';
import { getPoints, getLinePath } from '../../util';

const DefaultLine: React.FC<LineData> = (props) => {
  const { start, end, option } = props;
  const { lineWidth, lineColor, animation } = option;
  const path = getLinePath(getPoints(start, end, option));
  console.log(`render line --->>[${props.startId}-${props.endId}]`);
  return (
    <polyline
      points={path}
      style={{
        strokeWidth: lineWidth,
        stroke: lineColor,
        fill: 'transparent',
        // strokeDasharray: `${length},${length}`,
        animation: animation ? `renderLine 1s linear` : undefined
      }}
    />
  );
};

export default React.memo(DefaultLine);
