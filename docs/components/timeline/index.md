---
title: Tileline 时间轴
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data-display
  order: 3
---

# Tileline 时间轴

时间轴

## 代码演示

### timeline

<code src="./demo/simple.tsx" />

## API

## Timeline Props

| 参数  | 说明       | 类型              | 默认值 | 备注 |
| ----- | ---------- | ----------------- | ------ | ---- |
| title | 时间轴标题 | string\|ReactNode | none   |      |

## Timeline.Item Props

| 参数  | 说明           | 类型              | 默认值 | 备注                          |
| ----- | -------------- | ----------------- | ------ | ----------------------------- |
| title | 时间轴标题     | string\|ReactNode | none   | title 默认字体会加粗显示      |
| color | 原点中心的颜色 | string            | none   |                               |
| fill  | 原点的填充色   | string            | none   | 如果不传会根据 color 自动计算 |
