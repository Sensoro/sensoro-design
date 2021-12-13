import React from 'react';
import { Line as LineData } from '../types';

import DefaultLine from './default';
import PointLine from './point';
import PathLine from './path';

const plugins = {
  default: DefaultLine,
  point: PointLine,
  path: PathLine
};

interface LineSelectorProps extends LineData {
  updateEqual?: boolean;
}

const LineSelector: React.FC<LineSelectorProps> = (props) => {
  const { option, updateEqual, type, start, end } = props;
  const { lineType } = option;
  const needRender = type === 'optimized' || updateEqual;
  const Component = plugins[lineType];
  return <>{Component && needRender && start && end && <Component {...props} />}</>;
};

export default LineSelector;
