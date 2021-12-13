import React, { FC, CSSProperties, useMemo } from 'react';
import classNames from '@pansy/classnames';
import { Popover } from 'antd';

export interface SpeedProps {
  prefixCls?: string;
  style?: CSSProperties;
  // 倍数配置
  list?: number[];
  value?: number;
  doubleRow?: boolean;
  onChange?: (value: number) => void;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

const Speed: FC<SpeedProps> = (props) => {
  const { prefixCls, getPopupContainer, list = [], value, onChange, doubleRow, style } = props;

  const handleClick = (val: number) => {
    onChange?.(val);
  };

  const renderItem = (item: number) => {
    return (
      <div
        className={classNames(`${prefixCls}-content-item`, {
          [`is-active`]: value === item
        })}
        key={item}
        onClick={() => {
          handleClick(item);
        }}
      >
        {item}x
      </div>
    );
  };

  const renderContent = useMemo(() => {
    return <div className={`${prefixCls}-content`}>{list.map(renderItem)}</div>;
  }, [props.list, value]);

  const renderDoubleRowContent = useMemo(() => {
    return (
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-content-row`}>{list.slice(0, 4).map(renderItem)}</div>
        <div className={`${prefixCls}-content-row`} style={{ marginLeft: 8 }}>
          {list.slice(4, 7).map(renderItem)}
        </div>
      </div>
    );
  }, [props.list, value]);

  return (
    <Popover
      overlayClassName={classNames(`${prefixCls}-popover`, {
        [`is-double-row`]: doubleRow
      })}
      trigger="hover"
      getPopupContainer={getPopupContainer}
      content={doubleRow ? renderDoubleRowContent : renderContent}
    >
      <div className={`${prefixCls}`} style={style}>
        {value}x
      </div>
    </Popover>
  );
};

Speed.defaultProps = {
  prefixCls: 'sen-player-speed',
  list: [0.25, 0.5, 1, 2, 4, 8, 16],
  value: 1,
  doubleRow: false
};

export default Speed;
