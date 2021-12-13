import React from 'react';
import { useMeasure } from '../_utils/measure';
import { useLineBoardContext } from './context';
import { PointProps, Placement, Point as PointType } from './types';

function getPoint(rect: ClientRect, placement: Placement): PointType {
  const { width, height, top, left } = rect;
  if (placement === 'top') {
    return { x: left + width * 0.5, y: top };
  } else if (placement === 'left') {
    return { x: left, y: top + height * 0.5 };
  } else if (placement === 'right') {
    return { x: left + width, y: top + height * 0.5 };
  } else if (placement === 'bottom') {
    return { x: left + width * 0.5, y: top + height };
  } else if (placement === 'left-top') {
    return { x: left, y: top };
  } else if (placement === 'right-top') {
    return { x: left + width, y: top };
  } else if (placement === 'left-bottom') {
    return { x: left, y: top + height };
  } else if (placement === 'right-bottom') {
    return { x: left + width, y: top + height };
  } else {
    return { x: left + width * 0.5, y: top + height * 0.5 };
  }
}

const Point: React.FC<PointProps> = (props) => {
  const { children, id, placement = 'center', context = useLineBoardContext(), ...rest } = props;
  const { width, height, getUpdateIndex, registerPoint, unregisterPoint } = context;
  const updateIndex = getUpdateIndex(id);
  const { ref, rect } = useMeasure([width, height, updateIndex]);
  React.useLayoutEffect(() => {
    if (id && rect.width > 0 && rect.height > 0) {
      registerPoint?.(id, getPoint(rect, placement), updateIndex);
    }
  }, [id, rect, placement, updateIndex]);

  React.useLayoutEffect(() => {
    return () => {
      if (id) {
        unregisterPoint?.(id);
      }
    };
  }, []);

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
};

export default Point;
