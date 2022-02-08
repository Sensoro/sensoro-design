---
title: Battery 电池
nav:
  title: 组件
  path: /components
group:
  title: 设备组件
  path: /device
  order: 98
---

# Battery 电池

展示电池电量。(v1.0.14+)

## 代码演示

## 简单使用

展示电量。

<code src="./demo/simple.tsx" />

设置颜色

<code src="./demo/color.tsx" />

通电状态

<code src="./demo/charge.tsx" />

## API

文本链接的属性说明如下：

| 参数      | 说明                           | 类型                  | 默认值 | 版本 |
| --------- | ------------------------------ | --------------------- | ------ | ---- |
| className | 额外的样式类                   | string                | --     | --   |
| style     | 额外的样式(控制组件大小和颜色) | CSSProperties         | --     | --   |
| value     | 电量值 (-1 表示充电状态)       | number(0 - 100) \| -1 | --     | --   |
| color     | 组件的颜色                     | string                | --     | --   |
