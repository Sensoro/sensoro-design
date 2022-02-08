---
title: Empty 空状态
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data-display
---

# Empty 空状态

空状态时的展示占位图。

## 何时使用

- 当目前没有数据时，用于显式的用户提示。
- 初始化场景时的引导创建流程。

## 代码演示

### 基本示例

<code src="./demo/simple.tsx" />

### 自定义

<code src="./demo/customize.tsx" />

### Icon

<code src="./demo/icon.tsx" />

### 纯文本

<code src="./demo/no-icon.tsx" />

### 垂直居中

<code src="./demo/center.tsx" />

## API

| 参数        | 说明            | 类型                                       | 默认值   | 版本 |
| ----------- | --------------- | ------------------------------------------ | -------- | ---- |
| className   | 额外的样式类    | string                                     | --       | --   |
| style       | 额外的样式      | CSSProperties                              | --       | --   |
| icon        | 显示的图片 icon | ReactNode \| 'device' \| 'data' \| 'image' | data     | --   |
| description | 描述信息        | ReactNode \| string                        | 暂无内容 | --   |
| center      | 是否垂直居中    | boolean                                    | false    | --   |
