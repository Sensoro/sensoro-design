import React from 'react';
import { Line as LineData } from '../../types';
import { getPoints, getLinePath } from '../../util';

const PointLine: React.FC<LineData> = (props) => {
  const { start, end, option } = props;
  const { lineWidth, lineColor, animation } = option;
  const path = getLinePath(getPoints(start, end, option));
  return (
    <>
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
      <circle
        cx={start.x}
        cy={start.y}
        r={4}
        style={{
          fill: lineColor
        }}
      />
      <circle
        cx={end.x}
        cy={end.y}
        r={4}
        style={{
          fill: lineColor
        }}
      />
      <circle
        cx={end.x}
        cy={end.y}
        r={10}
        style={{
          fill: lineColor,
          fillOpacity: 0.4,
          animation: `flashing 1.2s linear infinite`
        }}
      />
    </>
  );
};

export default PointLine;
