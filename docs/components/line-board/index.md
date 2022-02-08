---
title: LineBoard 连线板
nav:
  title: 组件
  path: /components
group:
  title: 通用
  path: /data-display
---

# 基本使用

可使屏幕内任意 dom 元素连起来，支持动画效果。

## 代码演示

### 自动连接

<!-- #### \*需要注意的是这种方式不会动态测量元素位置

<code src="./demo/auto-connect.tsx" /> -->

### 基本示例

<code src="./demo/optimized.tsx" />

### 折线连接并开启动画效果

<code src="./demo/polyline.tsx" />

## API

## connect option(为了使用更加方便以高阶函数存在)

| 参数         | 说明                               | 类型                                                                | 默认值    | 是否必须 |
| ------------ | ---------------------------------- | ------------------------------------------------------------------- | --------- | -------- |
| lineColor    | 线的颜色                           | string                                                              | #2B6DE5   | 否       |
| lineWidth    | 线的宽度                           | number                                                              | 2         | 否       |
| lineType     | 线的类型                           | 'default' \| 'point'                                                | 'default' | 否       |
| animation    | 是否开启动画效果                   | boolean                                                             | false     | 否       |
| getWayPoints | 画折现使用，目前只支持画直线和折线 | (start: Point, end: Point, startId:string, endId:string) => Point[] | -         | 否       |

## Point 组件

| 参数      | 说明             | 类型                                                                                                               | 默认值   | 是否必须 |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ | -------- | -------- |
| id        | 点的 ID          | string                                                                                                             | -        | 是       |
| placement | 连接点的位置     | 'center' \| 'left' \| 'top' \| 'right' \| 'bottom' \| 'left-top' \| 'right-top' \| 'left-bottom' \| 'right-bottom' | 'center' | 否       |
| context   | 自定义的 context | Context                                                                                                            | -        | 否       |

## useLineRender(主要提供下列方法， 具体用法见例子)

renderLine: (start: string, end: string) => void;

destroyLine: (start: string, end: string) => void;

renderLines: (lines: [string, string][]) => void;

destroyLines: (lines: [string, string][]) => void;
