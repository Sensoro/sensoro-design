---
title: NumberRoller 数字滚动组件
nav:
  title: 组件
  path: /components
group:
  title: 通用
  path: /data-display
---

# NumberRoller

数字变卦滚动展示

## 代码演示

### 基本示例

<code src="./demo/demo-01.tsx" />

## API

| 参数   | 说明       | 类型      | 默认值 | 版本    |
| ------ | ---------- | --------- | ------ | ------- |
| value  | 要展示的值 | `number`  | --     | 1.38.15 |
| size   | 字体大小   | `number`  | 24     | 1.38.15 |
| height | 高度/行高  | `number`  | 32     | 1.38.15 |
| format | 增加千位符 | `boolean` |        | 1.38.15 |

**注意：** `value` 与 `children`等效，`value` 优先级高
