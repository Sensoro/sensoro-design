import React from 'react';
import { Checkbox } from 'antd';
import classNames from '@pansy/classnames';
import Item from './item';
import { ToolTipCondition } from '../_utils/condition-component';
import './style/index.less';

const prefixCls = 'sen-palette';

export type Value = string[] | number[] | string | number;

export interface Data {
  label?: string;
  value: string | number;
  color: string;
}

export interface PaletteProps {
  className?: string;
  style?: React.CSSProperties;
  multiple?: boolean;
  data?: Data[];
  //这两个地方先写any
  value?: any;
  onChange?: (val: any) => void;
  // children?: React.FC<PaletteItemProps>[];
}
const useLabelMap = (data: Data[] = []) =>
  data.reduce((prev: any, c) => {
    if (c.label) {
      if (!prev) {
        prev = {};
      }
      prev[c.value] = c.label;
    }
    return prev;
  }, undefined);

const Palette: React.FC<PaletteProps> = (props) => {
  const { className, data, multiple, value, onChange, children, ...rest } = props;

  const [selected, setSelected] = React.useState(!!value ? (multiple ? value : [value]) : []);

  const handelGroupChange = (checkedList) => {
    if (!!multiple) {
      onChange?.(checkedList);
      setSelected(checkedList);
    } else {
      onChange?.(checkedList[checkedList.length - 1]);
      setSelected(checkedList[checkedList.length - 1]);
    }
  };

  return (
    <div className={classNames(className, prefixCls)} {...rest}>
      <Checkbox.Group
        style={{ width: '100%', display: 'flex' }}
        // value={!!multiple ? value : [value]}
        value={!!value ? (!!multiple ? value : [value]) : selected}
        onChange={handelGroupChange}
      >
        {data ? data.map((c, idx) => <Item key={c.value} {...c} />) : children}
      </Checkbox.Group>
    </div>
  );
};

export default Palette;
