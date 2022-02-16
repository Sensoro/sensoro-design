---
title: PictureAxis 图片展示轴
nav:
  title: 业务组件
  path: /business
group:
  title: 数据展示
  path: /data-display
---

# PictureAxis 图片展示轴

展示实时推送的图片信息

## 代码演示

### 简单示例

<code src="./demo/simple.tsx" />

### 数据为空

<code src="./demo/empty.tsx" />

## API

| 参数      | 说明         | 类型          | 默认值 | 版本 |
| --------- | ------------ | ------------- | ------ | ---- |
| className | 额外的样式类 | string        | --     | --   |
| style     | 额外的样式   | CSSProperties | --     | --   |
| list      | 数据源       | object[]      | --     | --   |

数据源数据结构

```ts
// person 人脸图片 car 机动车图片
type PictureType = 'person' | 'car';

{
  // 唯一标识
  id: string;
  // 照片类型
  type: PictureType;
  // 图片地址
  url: string;
  // 抓拍时间
  captureTime: number;
}
```
