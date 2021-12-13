import React from 'react';
import Switch, { SwitchProps } from 'antd/es/switch';
import classNames from '@pansy/classnames';

const SSwitch: React.FC<SwitchProps> = (props) => {
  const { prefixCls, className } = props;
  return (
    <Switch
      prefixCls={prefixCls}
      {...props}
      className={classNames(className, {
        [`${prefixCls}`]: prefixCls,
        ['sensoro-ui-switch']: true
      })}
    />
  );
};

export default SSwitch;
