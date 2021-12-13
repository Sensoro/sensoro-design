import React from 'react';
import { Point, Option } from './types';

export const usePrevious = (value: any) => {
  const ref = React.useRef<any>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const getPoints = (startPoint: Point, endPoint: Point, option: Option) => {
  let points = [startPoint];
  if (typeof option.getWayPoints === 'function') {
    points = points.concat(option.getWayPoints(startPoint, endPoint));
  }
  points.push(endPoint);
  return points;
};

export const getPointsLength = (points: Point[]) => {
  let length = 0;
  function getLength(a: Point, b: Point) {
    let length = 0;
    if (a && b) {
      const w = b.x - a.x;
      const h = b.y - a.y;
      length = Math.sqrt(w * w + h * h);
    }
    return length;
  }
  if (points.length > 1) {
    for (let i = 0; i < points.length - 1; ++i) {
      length += getLength(points[i], points[i + 1]);
    }
  }
  return length;
};

export const getLinePath = (points: Point[] = []): string => {
  return points
    .reduce((prev, p) => {
      prev.push(p.x);
      prev.push(p.y);
      return prev;
    }, [])
    .join(' ');
};
