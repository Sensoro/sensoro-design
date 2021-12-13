import React, { FC } from 'react';
import { Sensor } from '@sensoro/sensoro-design';

const { Icon, Status } = Sensor;

const Example: FC = () => {
  return (
    <div>
      <div>
        <div>简单Icon:</div>
        <Icon type={'SMOKE'} />
        <Icon type={'HYDRANT'} />
        <Icon type={'FULL_RECOGNITION'} />
        <Icon type={'LPG'} />
        <div style={{ marginTop: 10 }}>带文本的Icon:</div>
        <Icon type={'SMOKE'} text={'烟感'} />
      </div>
      <div style={{ marginTop: 10 }}>传感器状态:</div>
      <Status type={'ISOLATION'} />
      <Status type={'ALARM'} style={{ marginLeft: 8 }} />
      <Status type={'DANGEER'} style={{ marginLeft: 8 }} />
      <Status type={'FAULT'} style={{ marginLeft: 8 }} />
      <Status type={'DISCONNECT'} style={{ marginLeft: 8 }} />
      <Status type={'NORMAL'} style={{ marginLeft: 8 }} />
    </div>
  );
};

export default Example;
