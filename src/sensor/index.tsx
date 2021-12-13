import React from 'react';
import Icon from './icon';
import Status from './status';

class Sensor {
  public static Icon: typeof Icon;
  public static Status: typeof Status;
}

Sensor.Icon = Icon;
Sensor.Status = Status;

export default Sensor;
