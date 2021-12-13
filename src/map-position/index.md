---
title: MapPosition 地图位置组件
nav:
  title: 组件
  path: /components
group:
  title: 地图
  path: /map
---

# MapPosition 地图位置组件

## 代码演示

### 基本示例

<code src="./demo/demo1.tsx" />

### 在表单中使用

<code src="./demo/demo2.tsx" />

### 只读模式下，仅显示，不支持修改

<code src="./demo/demo3.tsx" />

### 自定义Icon

<code src="./demo/demo-04.tsx" />

## API

| 参数       | 说明                   | 类型                                            | 默认值 | 版本 |
| ---------- | ---------------------- | ----------------------------------------------- | ------ | ---- |
| className  | 额外的样式类           | string                                          | --     | --   |
| style      | 额外的样式             | CSSProperties                                   | --     | --   |
| value      | 经纬度坐标以及位置信息 | { lnglat: [number, number]; location: string; } | --     | --   |
| icon      | 标记点的Icon | `ReactNode` | --     | `1.36.4`   |
| offset      | 标记点的偏移量  | `[number, number]` | `[-16, -16]` | `1.36.4`   |
| onChange   | 位置改变的回调         | (value) => void                                 | --     | --   |
| isReadOnly | 只读模式               | boolean                                         | false  | --   |
