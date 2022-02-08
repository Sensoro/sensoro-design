import React from 'react';
import { Schedule } from '@sensoro/sensoro-design';
import { Schedules } from '../interface';

const defaultValue: Schedules = [
  {
    day: 1,
    timeArray: [
      { start: 0, end: 300 * 60 * 1000 },
      { start: 500 * 60 * 1000, end: 600 * 60 * 1000 },
      { start: 700 * 60 * 1000, end: 1439 * 60 * 1000 }
    ]
  },
  { day: 2, timeArray: [{ start: 500 * 60 * 1000, end: 600 * 60 * 1000 }] },
  { day: 3, timeArray: [] },
  { day: 4, timeArray: [] },
  { day: 5, timeArray: [] },
  { day: 6, timeArray: [] },
  { day: 7, timeArray: [{ start: 0, end: 1439 * 60 * 1000 }] }
];

export default () => {
  return <Schedule isReadOnly value={defaultValue} />;
};
