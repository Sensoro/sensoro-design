import React from 'react';
import { Dropdown } from 'antd';
import { Menu } from '@sensoro/sensoro-design';
import DownOutlined from '@sensoro-design/icons/DownOutlined';
const { SubMenu } = Menu;

const menu = (
  <Menu>
    <Menu.Item>1st menu item</Menu.Item>
    <Menu.Item>2nd menu item</Menu.Item>
    <Menu.Item>2nd menu item</Menu.Item>
    <SubMenu title="sub menu">
      <Menu.Item>3rd menu item</Menu.Item>
      <Menu.Item>4th menu item</Menu.Item>
    </SubMenu>
    <SubMenu title="sub">
      <Menu.Item>5d menu item</Menu.Item>
      <Menu.Item>6th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);

const DropdownMenu = (props) => {
  return (
    <Dropdown overlay={menu} overlayStyle={{ minWidth: 'auto' }}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Cascading menu <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;
