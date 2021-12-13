import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { OptionsItem } from './types';
import TextButton from './text-button';

export const createMenu = (children) => {
  return (
    <Menu>
      {children && children.map((child, idx) => <Menu.Item key={idx}>{child}</Menu.Item>)}
    </Menu>
  );
};

export const createMenuWithOptions = (options: OptionsItem[], onClick?: (key?: string) => void) => {
  return (
    <Menu onClick={({ key }) => onClick && onClick(key as string)}>
      {options &&
        options.map((op, idx) => (
          <Menu.Item key={op.value} icon={op?.icon} disabled={op?.disabled}>
            <TextButton disabled={op?.disabled} hoverStyle={true}>
              {op.label}
            </TextButton>
          </Menu.Item>
        ))}
    </Menu>
  );
};
