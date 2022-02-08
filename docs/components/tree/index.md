---
title: Tree 树
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data-display
---

# Tree 树

## 代码演示

### 简单使用

<code src="./demo/simple.tsx" />

### 自定义菜单

<code src="./demo/advance.tsx" />

## API

### TreeData

| 参数     | 说明             | 类型                | 默认值 | 备注 |
| -------- | ---------------- | ------------------- | ------ | ---- |
| title    | 树节点的 title   | string \| ReactNode | -      |      |
| key      | 树节点的唯一标识 | string \| number    | -      | 必填 |
| children | 子节点           | Array               | -      |      |
| menus    | hover 菜单       | MenuData[]          | -      |      |

### MenuData

| 参数      | 说明            | 类型       | 默认值 | 备注                                                                         |
| --------- | --------------- | ---------- | ------ | ---------------------------------------------------------------------------- |
| label     | 菜单的 tooltips | string     | -      |                                                                              |
| icon      | 菜单的实体      | ReactNode  | -      |                                                                              |
| value     | 菜单的 key 值   | ReactNode  | -      | 最好唯一(如果有 subMenu 的情况下和 subMenu 有区分)                           |
| subMenus  | 菜单的子菜单    | MenuData[] | -      | 目前不支持二级菜单，如果有需要可以扩展                                       |
| component | 自定义菜单      | ReactNode  | -      | 如果自定义菜单上面的属性除了 value 之外都会失效(也可以绑定自定义 click 事件) |

### TreeProps(其他参数参考 antd 的 Tree)

| 参数        | 说明                  | 类型              | 默认值 | 备注 |
| ----------- | --------------------- | ----------------- | ------ | ---- |
| onMenuClick | 点击 hover 菜单的回调 | (val, data)=>void | -      |      |
