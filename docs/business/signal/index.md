---
title: Signal 信号
nav:
  title: 业务组件
  path: /business
group:
  title: 设备组件
  path: /device
---

# Signal 信号

展示设备信号。(v1.0.15+)

## 代码演示

## 简单使用

展示信号。

<code src="./demo/simple.tsx" />

设置颜色

<code src="./demo/color.tsx" />

## API

| 参数      | 说明                           | 类型          | 默认值  | 版本 |
| --------- | ------------------------------ | ------------- | ------- | ---- |
| className | 额外的样式类                   | string        | --      | --   |
| style     | 额外的样式(控制组件大小和颜色) | CSSProperties | --      | --   |
| value     | 电量值                         | number(0 - 5) | 0       | --   |
| colors    | 组件的颜色                     | string        | #b4b8bf | --   | -- |
