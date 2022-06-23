import React from 'react';
import { Space, Menu, Dropdown } from 'antd';
import MoreOutlined from '@sensoro-design/icons/MoreOutlined';
import { Button } from './button';
import { cloneElement } from '../_utils/reactNode';

import type { ButtonSize, ButtonProps } from 'antd/es/button';

export interface ButtonGroupProps {
  /**
   * 对齐方式，左对齐主要按钮在左边，右对齐主要按钮在右边
   * @default 'left'
   */
  type?: 'left' | 'right';
  /**
   * 按钮大小
   */
  size?: ButtonSize;
  children: React.ReactNode;
  /** 按钮点击回调 */
  onClick?: (type: string | number) => void;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  type = 'left',
  size,
  children,
  onClick
}) => {
  let btns = [];

  const handleButtonClick = (key: string) => {
    onClick?.(key);
  };

  React.Children.forEach(children, (child: any) => {
    if (child && child.type?.displayName === 'Button') {
      btns.push(child);
    }
  });

  const renderBtns = (list: React.ReactElement[]) => {
    const nodes = React.Children.map(list, (child, index) => {
      return cloneElement(child, (props: ButtonProps & { key: string }) => {
        if (index === 0) {
          props.type = 'primary';
          props.block = undefined;
        } else {
          props.type === 'primary' ? (props.type = undefined) : props.type;
        }

        props.size = size;

        // @ts-ignore
        if (props.children?.type?.displayName !== 'Button') {
          props.onClick = () => {
            handleButtonClick((child.key ?? index + 1).toString());
          };
        }

        return props;
      });
    });

    return <Space size={12}>{type === 'left' ? nodes : nodes.reverse()}</Space>;
  };

  const menu = (
    <Menu>
      {React.Children.map(btns.slice(2, btns.length), (child, index) => {
        const key = child.key || index + 2;
        return (
          <Menu.Item
            key={key}
            disabled={child.props.disabled}
            onClick={() => {
              handleButtonClick(key);
            }}
          >
            {child.props.children}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  if (btns.length > 3) {
    btns = [
      ...btns.slice(0, 2),
      <Dropdown overlay={menu}>
        <Button size={size} icon={<MoreOutlined />} />
      </Dropdown>
    ];
  }

  return renderBtns(btns);
};
