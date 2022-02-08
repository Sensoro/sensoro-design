---
title: Live 直播
nav:
  title: 组件
  path: /components
group:
  title: 音视频
  path: /audio-video
---

# Live 直播

播放视频或者直播

## 代码演示

### 简单示例

<code src="./demo/live.tsx" />

### 离线

<code src="./demo/offline.tsx" />

### 重试

<code src="./demo/retry.tsx" />

### 水印

<code src="./demo/demo-04.tsx" />

## API

| 参数            | 说明           | 类型                     | 默认值      | 版本 |
| --------------- | -------------- | ------------------------ | ----------- | ---- |
| className       | 额外的样式类   | string                   | --          | --   |
| style           | 额外的样式     | CSSProperties            | --          | --   |
| source          | 媒体源         | string                   | --          | --   |
| hideControlbar  | 是否隐藏控制栏 | boolean                  | false       | --   |
| isOffline       | 是否离线       | boolean                  | false       | --   |
| maxQuality      | 最大的清晰度   | QUALITY                  | QUALITY.FHD | --   |
| currentQuality  | 当前清晰度     | QUALITY                  | QUALITY.FHD | --   |
| onQualityChange | 切换清晰度回调 | (value: QUALITY) => void | --          | --   |

清晰度説明:

```ts
// FHD 超清 HD 高清 SD 标请
export enum QUALITY {
  FHD = 0,
  HD = 1,
  SD = 2
}
```
