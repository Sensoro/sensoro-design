---
title: Palette 调色板
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
  path: /data-entry
  order: 3
---

# Palette 调色板

调色板，支持 form 表单

## 代码演示

### 简单使用

<code src="./demo/simple.tsx" />

### 自定义样式

<code src="./demo/advance.tsx" />

## API

## Palette 属性

| 参数      | 说明                   | 类型                                                 | 默认值 | 备注                         |
| --------- | ---------------------- | ---------------------------------------------------- | ------ | ---------------------------- |
| className | 组件的 className       | string                                               | none   |                              |
| style     | 组件的样式             | {}                                                   | none   |                              |
| data      | 传入数据               | {value:string\|number, color: string, label?:string} | none   | 传入这个参数则不会渲染子节点 |
| multiple  | 是否支持多选           | boolean                                              | false  |                              |
| value     | 选中的颜色值           | string \| number \| string[] \| number[]             | none   | 受控属性,可以和表单一起使用  |
| onChange  | 颜色选中发生变化的回调 | (val:any)=>void                                      | none   |                              |

## Palette.Item 属性

| 参数      | 说明             | 类型             | 默认值 | 备注                     |
| --------- | ---------------- | ---------------- | ------ | ------------------------ |
| className | 组件的 className | string           | none   | 可以修改 item 的样式     |
| style     | 组件的样式       | {}               | none   | 可以修改 item 的样式     |
| value     | item 选中后的值  | string \| number | none   | 受控属性                 |
| color     | item 的背景色    | string           | none   |                          |
| label     | 颜色的 label     | string           | none   | 可选参数                 |
| tickStyle | 选中对勾的样式   | {}               | none   | 可用于修改选中对勾的样式 |
