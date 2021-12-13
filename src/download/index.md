---
title: Download 下载
nav:
  title: 组件
  path: /components
group:
  title: 操作组件
  path: /operation
---

# Download 下载

下载文件 (v1.1.1)

注意: 由于浏览器限制（此组件只支持谷歌和火狐，且不可下载浏览器直接可打开的文件，比如：图片、PDF）

## 代码演示

## 简单使用

<code src="./demo/simple.tsx" />

## 异步获取地址

<code src="./demo/promise.tsx" />

## API

| 参数     | 说明   | 类型      | 默认值 | 版本 |
| -------- | ------ | --------- | ------ | ---- |
| children | 子组件 | ReactNode | --     | --   |

使用请在子组件上绑定 `onClick` 返回文件路径即可;
