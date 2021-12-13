import React, { FC, useState, useEffect, useMemo } from 'react';
import { Popover } from 'antd';
import classNames from '@pansy/classnames';

type ModeData = {
  key: string;
  label: string;
};

interface LiveModeProps {
  prefixCls?: string;
  list?: ModeData[];
  value?: string;
  onChange?: (value: string) => void;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

const LiveMode: FC<LiveModeProps> = (props) => {
  const { prefixCls, getPopupContainer, list = [], value, onChange } = props;
  const [currentMode, setCurrentMode] = useState<ModeData>(list[0]);

  useEffect(() => {
    if (value) {
      setCurrentMode(list.find((item) => item.key === value));
    }
  }, [props.value]);

  const handleClick = (val: ModeData) => {
    setCurrentMode(val);
    onChange?.(val.key);
  };

  const renderContent = useMemo(() => {
    return (
      <div className={`${prefixCls}-content`}>
        {list.map((item) => {
          return (
            <div
              className={classNames(`${prefixCls}-content-item`, {
                [`is-active`]: currentMode?.key === item.key
              })}
              key={item.key}
              onClick={() => {
                handleClick(item);
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  }, [props.list, currentMode]);

  return (
    <Popover
      overlayClassName={`${prefixCls}-popover`}
      trigger="hover"
      getPopupContainer={getPopupContainer}
      content={renderContent}
    >
      <div className={`${prefixCls}`}>{currentMode?.label?.substring(0, 2)}</div>
    </Popover>
  );
};

LiveMode.defaultProps = {
  prefixCls: 'sen-player-live-mode',
  list: [
    { key: 'flv', label: '实时优先' },
    { key: 'hls', label: '流畅优先' }
  ]
};

export default LiveMode;
