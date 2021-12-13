---
title: CardPlus 增强卡片
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data-display
---

# CardPlus 增强卡片

标准容器卡片，提供标准卡片样式，以及栅格布局能力。

## 何时使用

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## 代码演示

### 基础卡片

<code src="./demo/demo-01.tsx" background="#f0f2f5" />

### 栅格布局

<code src="./demo/demo-02.tsx" background="#f0f2f5" />

### 响应式

<code src="./demo/demo-03.tsx" background="#f0f2f5" />

### 卡片切分

<code src="./demo/demo-04-01.tsx" background="#f0f2f5" />

<code src="./demo/demo-04-02.tsx" background="#f0f2f5" />

<code src="./demo/demo-04-03.tsx" background="#f0f2f5" />

### 栅格间隔

<code src="./demo/demo-05.tsx" background="#f0f2f5" />

### 标题带分割线

<code src="./demo/demo-06.tsx" background="#f0f2f5" />

### 可折叠

<code src="./demo/demo-07.tsx" background="#f0f2f5" />

### 内容居中

<code src="./demo/demo-08.tsx" background="#f0f2f5" />

### 加载中

<code src="./demo/demo-09.tsx" background="#f0f2f5" />

### 无标题

<code src="./demo/demo-10.tsx" background="#f0f2f5" />

### 带边框

<code src="./demo/demo-11.tsx" background="#f0f2f5" />

### 基本 tabs 卡片

// 待实现

<code src="./demo/demo-12-01.tsx" background="#f0f2f5"/>

### 垂直 tabs 卡片

// 待实现

<code src="./demo/demo-12-02.tsx" background="#f0f2f5"/>

### 垂直 steps 卡片

// 待实现

<code src="./demo/demo-13.tsx" background="#f0f2f5"/>

## API

| 参数             | 说明                                                                                             | 类型                            | 默认值  | 版本 |
| ---------------- | ------------------------------------------------------------------------------------------------ | ------------------------------- | ------- | ---- |
|  title           | 标题                                                                                             | `React.ReactNode`               | -       | -    |
|  extra           | 右上角自定义区域                                                                                 | `React.ReactNode`               | -       | -    |
|  layout          | 内容布局，支持垂直居中                                                                           | `default` \| `center`           | default | -    |
|  loading         | 加载中，支持自定义 loading 样式                                                                  | `boolean`                       | false   | -    |
| colSpan          | 栅格布局宽度，24 栅格，支持指定宽度 px 或百分比, 支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | `number` \| `string`            | 24      | -    |
|  gutter          | 数字或使用数组形式同时设置 [水平间距, 垂直间距], 支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | `number` \| `array`             | 0       | -    |
|  split           | 拆分卡片的方向                                                                                   | `vertical` \| `horizontal`      | -       | -    |
| bordered         | 是否有边框                                                                                       | `boolean`                       | false   | -    |
| headerBordered   | 页头是否有分割线                                                                                 | `boolean`                       | false   | -    |
| collapsed        | 受控属性，是否折叠                                                                               | `boolean`                       | false   | -    |
| collapsible      | 配置是否可折叠，受控时无效                                                                       | `boolean`                       | false   | -    |
| defaultCollapsed | 默认折叠, 受控时无效                                                                             | `boolean`                       | false   | -    |
| onCollapse       | 收起卡片的事件，受控时无效                                                                       | `(collapsed: boolean) => void;` | -       | -    |
