import React, { isValidElement } from 'react';
import isNaN from 'lodash/isNaN';
import isNumber from 'lodash/isNumber';
import { Typography } from 'antd';
import { isString } from 'lodash';

export interface NoFieldProps {
  value?: any;
}

const { Text } = Typography;

export function getRenderText(value: any): number | string {
  if ((isNumber(value) && !isNaN(value)) || (isString(value) && value)) {
    return value;
  }

  return '-';
}

const NoField: React.FC<NoFieldProps> = (props) => {
  const { children } = props;
  const value = 'value' in props ? props.value : children;

  if (Array.isArray(value) && value.length) {
    return <>{value}</>;
  }

  if (isValidElement(value)) {
    return value;
  }

  const text = getRenderText(value);

  return text === '-' ? <Text disabled>{text}</Text> : <span>{text}</span>;
};

export default NoField;
