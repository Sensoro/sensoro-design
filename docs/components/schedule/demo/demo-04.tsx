import React from 'react';
import { Schedule } from '@sensoro/sensoro-design';

const defaultValue = [
  { start: 0, end: 300 },
  { start: 500, end: 600 },
  { start: 700, end: 1439 }
];

export default () => {
  return <Schedule.Slider style={{ width: 568 }} isReadOnly unit="minute" value={defaultValue} />;
};
