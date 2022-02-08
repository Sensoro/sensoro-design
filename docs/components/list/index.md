---
title: List 列表
nav:
  title: 组件
  path: /components
group:
  title: 通用
  path: /data-display
---

# List 列表

列表组件，支持加载更多功能，灰常好用。

## List 用法

<code src="./demo/simple.tsx" />

## 配合 timeline

<code src="./demo/timeline.tsx" />

## List Props

| 参数       | 说明             | 类型                  | 默认值 | 备注                                                                  |
| ---------- | ---------------- | --------------------- | ------ | --------------------------------------------------------------------- |
| className  | 组件的 className | string                | -      | 可以修改 列表 的样式                                                  |
| style      | 组件的样式       | {}                    | -      | 可以修改 列表 的样式                                                  |
| height     | 列表的高度       | string \| number      | 0      | 列表的高度，这个一定要指定,这个值会覆盖 style 和 class 的 height 属性 |
| total      | 列表子节点的总数 | number                | -      |                                                                       |
| childCount | 已加载子节点数量 | number                | -      | 指定已加载子节点数量，默认是 children 的数量                          |
| onLoadMore | 加载更多的回调   | ()=>Promise<boolean\> | -      | 返回值必须是一个 promise                                              |
