import React from 'react';
import { Line as LineData } from '../../types';
import { getPoints, getLinePath, getPointsLength, usePrevious } from '../../util';

const PathLine: React.FC<LineData> = (props) => {
  const { start, end, option, progress } = props;
  const { lineWidth, lineColor } = option;
  const points = getPoints(start, end, option);
  const path = getLinePath(points);
  const length = getPointsLength(points);
  const prevProgress = usePrevious(progress);
  const pathRef = React.useRef(null);
  const { angle, point } = React.useMemo(() => {
    let angle = 0;
    let point = { x: 0, y: 0 };
    if (pathRef?.current) {
      const length = pathRef?.current.getTotalLength();
      const lPoint = pathRef?.current?.getPointAtLength(length * prevProgress);
      const cPoint = pathRef?.current?.getPointAtLength(length * progress);
      point = cPoint;
      angle = Math.atan2(cPoint.y - lPoint.y, cPoint.x - lPoint.x);
    }
    return { angle, point };
  }, [progress]);

  return (
    <>
      <polyline
        ref={(ref) => {
          if (ref) {
            pathRef.current = ref;
          }
        }}
        points={path}
        style={{
          strokeWidth: lineWidth,
          stroke: lineColor,
          fill: 'transparent',
          strokeDasharray: `${length * progress},${length}`
        }}
      />
      {progress > 0 && (
        <path
          fill={lineColor}
          d="M0,0L0,6L8,0L0,-6L0,0"
          transform={`translate(${point.x}, ${point.y}) rotate(${(angle * 180) / Math.PI})`}
        ></path>
      )}
    </>
  );
};

export default PathLine;
