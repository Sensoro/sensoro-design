---
title: TextLink 文本链接
nav:
  title: 组件
  path: /components
group:
  title: 通用
  path: /general
---

# TextLink 文本链接

按钮用于开始一个即时操作或跳转页面

## 代码演示

### 简单示例

<code src="./demo/simple.tsx" />

### 禁用示例

<code src="./demo/disabled.tsx" />

### 显示下划线

<code src="./demo/underline.tsx" />

## API

文本链接的属性说明如下：

| 参数      | 说明                 | 类型    | 默认值          | 版本 |
| --------- | -------------------- | ------- | --------------- | ---- |
| disable   | 失效状态             | boolean | `false`         | --   |
| href      | 点击跳转的地址       | string  | --              | --   |
| underline | 添加下划线样式       | boolean | `false`         | --   |
| target    | a 链接的 target 属性 | string  | --              | --   |
| onClick   | 点击时的回调         | string  | (event) => void | --   |
