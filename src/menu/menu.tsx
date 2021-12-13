import React from "react";
import classNames from "@pansy/classnames";
import { Menu as AntMenu } from "antd";
import { MenuProps } from "antd/es/menu";
import "./style/index.less";
const { SubMenu, Divider, Item, ItemGroup } = AntMenu;
const prefixCls = "sen-menu";

export default class Menu extends React.Component<MenuProps, {}> {
  static Divider = Divider;

  static Item = Item;

  static SubMenu = SubMenu;

  static ItemGroup = ItemGroup;

  render() {
    const { className, ...rest } = this.props;
    return <AntMenu className={classNames(className, prefixCls)} {...rest} />;
  }
}
