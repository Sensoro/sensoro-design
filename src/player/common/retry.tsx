import React from 'react';
import { Button } from 'antd';
import classNames from '@pansy/classnames';
import { ReloadOutlined } from '@ant-design/icons';

interface RetryProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'large' | 'middle' | 'small';
  onClick?: () => void;
}

const Retry: React.FC<RetryProps> = (props) => {
  const { prefixCls, className, style, size, onClick } = props;

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small'
      })}
      style={style}
    >
      <div>视频加载失败，请刷新重试</div>
      <Button
        icon={<ReloadOutlined />}
        size={size === 'large' ? 'middle' : size}
        onClick={onClick}
        type="primary"
      >
        刷新重试
      </Button>
    </div>
  );
};

Retry.defaultProps = {
  prefixCls: 'sen-player-retry',
  size: 'middle'
};

export default Retry;
