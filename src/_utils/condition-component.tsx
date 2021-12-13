import React from 'react';
import { Tooltip, Dropdown } from 'antd';
import { TooltipPropsWithTitle } from 'antd/es/tooltip';
import { DropDownProps } from 'antd/es/dropdown';

interface Condition {
  //防止和组件本身的disable参数冲突
  _disable?: boolean;
}

export const ToolTipCondition: React.FC<Condition & TooltipPropsWithTitle> = (props) => {
  const { _disable, children, ...rest } = props;
  return !_disable ? <Tooltip {...rest}>{children}</Tooltip> : <>{children}</>;
};

export const DropDownCondition: React.FC<Condition & DropDownProps> = (props) => {
  const { _disable, children, ...rest } = props;
  return !_disable ? <Dropdown {...rest}>{children}</Dropdown> : <>{children}</>;
};

export function excludeChildrenFragment(children: any) {
  if (children instanceof Array) {
    return React.Children.map(children, (child) =>
      child?.type === Symbol.for('react.fragment') ? child?.props?.children : child
    );
  } else {
    return children?.type === Symbol.for('react.fragment') ? children?.props?.children : children;
  }
}
