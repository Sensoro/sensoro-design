---
title: UploadImage 图片上传
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
  path: /data-entry
---

# UploadImage 图片上传

上传单个或多个图片

## 代码演示

### 基本使用

<code src="./demo/demo1.tsx" />

### 支持视频

<code src="./demo/demo-02.tsx" />

## API

| 参数           | 说明                                 | 类型   | 默认值    | 备注 |
| -------------- | ------------------------------------ | ------ | --------- | ---- |
| sizeLimit      | 图片大小限制，单位 K (-1 表示不限制) | number | 1024 (1M) | --   |
| videoSizeLimit | 视频大小限制，单位 K (-1 表示不限制) | number | `-1`      | --   |
| lengthLimit    | 图片数量限制 (-1 表示不限制)         | number | 3         | --   |
| desc           | 上传説明                             | string | --        | --   |
| value          | 已上传的文件                         | array  | --        | --   |
| iconRenderText | 上传中的文本                         | string | 上传中... | --   |
| uploadText     | 上传文案                             | string | 上传图片  | --   |
