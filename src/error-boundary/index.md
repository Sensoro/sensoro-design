---
title: ErrorBoundary 错误隔离
nav:
  title: 组件
  path: /components
group:
  title: 通用
  path: /general
---

# ErrorBoundary 错误隔离

## 代码演示

### 基础卡片

<code src="./demo/demo-01.tsx" />

## API

| 参数     | 说明                       | 类型                                           | 默认值 | 版本 |
| -------- | -------------------------- | ---------------------------------------------- | ------ | ---- |
| fallback | 出错时用来替换子组件的组件 | `React.ReactNode`                              | --     | --   |
| children | 子组件出错时的回调函数     | `React.ReactNode`                              | --     | --   |
| onError  | 出错回调函数               | `(error: Error, componentStack: string): void` | --     | --   |
