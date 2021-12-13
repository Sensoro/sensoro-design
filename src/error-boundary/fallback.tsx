import React, { useContext } from 'react';
import { Tooltip } from 'antd';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import { ConfigContext } from '../config-provider';

export interface FallbackProps {
  error: Error;
  componentStack: string;
}

const Fallback: React.FC<FallbackProps> = ({ componentStack, error }) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('error-boundary-fallback');

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-content`}>
        <Tooltip title={componentStack} trigger="hover" overlayClassName={`${prefixCls}-popover`}>
          <ExclamationCircleFilled />
        </Tooltip>
        <span>{error.toString()}</span>
      </div>
    </div>
  );
};

export default Fallback;
