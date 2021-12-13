import React from 'react';

import { DEVICE_STATUS, DEVICE_STATUS_CONFIG_MAP } from './types';

interface StatusProps {
  className?: string;
  style?: React.CSSProperties;
  type: string;
  size?: number;
}

const Status: React.FC<StatusProps> = (props) => {
  const { className, style, type, size = 6, children } = props;
  const statusConfig = DEVICE_STATUS_CONFIG_MAP[type];
  return statusConfig ? (
    <div className={className} style={{ display: 'inline-block', ...style }}>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: statusConfig.color
          }}
        />
        {children ?? (
          <span
            style={{
              fontFamily: 'PingFangSC-Regular',
              color: 'rgba(0, 0, 0, 0.45)',
              fontSize: 12,
              marginLeft: 4
            }}
          >
            {statusConfig.label}
          </span>
        )}
      </span>
    </div>
  ) : (
    <></>
  );
};

export default Status;
