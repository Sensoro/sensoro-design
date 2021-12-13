---
title: MapDeviceSelection 地图设备框选组件
nav:
  title: 组件
  path: /components
group:
  title: 地图
  path: /map
---

# MapDeviceSelection 地图设备框选组件

## 代码演示

### 普通设备

<code src="./demo/demo-01.tsx" />

### 表单示例

<code src="./demo/demo-02.tsx" />

### 只读状态

<code src="./demo/demo-03.tsx" />

### 使用国标设备

<code src="./demo/demo-04.tsx" />

## API

| 参数                | 说明                   | 类型                      | 默认值 | 版本 |
| ------------------- | ---------------------- | ------------------------- | ------ | ---- |
| className           | 额外的样式类           | string                    | --     | --   |
| style               | 额外的样式             | CSSProperties             | --     | --   |
| value               | 已经选择的设备         | string[]                  | --     | --   |
| readonly            | 只读模式               | boolean                   | false  | --   |
| transformData       | 是否做数据处理         | boolean                   | true   | --   |
| deviceKey           | 指定灵思设备的唯一标识 | string                    | `cid`  | --   |
| list                | 设备集合               | Array                     | --     | --   |
| listGB              | 国标设备集合           | Array                     | --     | --   |
| onChange            | 选择设备改变的回调     | (value: string[]) => void | --     | --   |
| onSelectDeviceClick | 点击选择设备回调       | Function                  | --     | --   |
