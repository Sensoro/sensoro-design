---
title: ScrollableBar 滑动展示
nav:
  title: 组件
  path: /components
group:
  title: 操作组件
  path: /operation
---

# ScrollableBar 滑动展示

## 代码演示

### 简单示例

<code src="./demo/demo-01.tsx" />

### 不可操作直接隐藏

<code src="./demo/demo-02.tsx" />

### ref 调用暴露方法

<code src="./demo/demo-03.tsx" />

### 自动切换

<code src="./demo/demo-04.tsx" />

## API

文本链接的属性说明如下：

| 参数           | 说明                            | 类型                   | 默认值     |
| -------------- | ------------------------------- | ---------------------- | ---------- |
| activeKey      | 当前活动的 Key                  | `string`               | --         |
| scrollAnimated | 是否开启滚动动画                | `boolean`              | `true`     |
| endMode        | 不可操作 prev/next 禁用还是隐藏 | `disabled` \| `hidden` | `disabled` |
| prevIcon       | 上一个 Icon 图标                | `React.ReactNode`      | --'        |
| nextIcon       | 下一个 Icon 图标                | `React.ReactNode`      | --'        |
| onItemClick    | 子项点击回调                    | `function`             | --         |
| onPrevClick    | 上一个点击回调                  | `function`             | --         |
| onNextClick    | 下一个点击回调                  | `function`             | --         |
