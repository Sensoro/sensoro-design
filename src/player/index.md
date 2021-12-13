---
title: Player 视频播放器
nav:
  title: 组件
  path: /components
group:
  title: 音视频
  path: /audio-video
  order: 100
---

# Player 视频播放器

播放视频或者直播

## Player 演示

### 播放器简单示例

<code src="./demo/simple.tsx" />

### 播放器隐藏控制栏

<code src="./demo/hide-controlbar.tsx" />

### 控制栏

<code src="./demo/controlbar.tsx" />

### 设置播放速率

<code src="./demo/speed.tsx" />

### 加载

<code src="./demo/loading.tsx" />

### 切换播放

<code src="./demo/demo-06.tsx" />

### 水印

<code src="./demo/demo-07.tsx" />

### 获取播放器示例

<code src="./demo/demo-08.tsx" />

## API

Player 组件

| 参数           | 说明                     | 类型                  | 默认值 | 版本 |
| -------------- | ------------------------ | --------------------- | ------ | ---- |
| className      | 额外的样式类             | string                | --     | --   |
| style          | 额外的样式               | CSSProperties         | --     | --   |
| version        | aliplayer 的版本         | string                | 2.8.2  | --   |
| source         | 媒体源                   | string                | --     | --   |
| loading        | 加载播放器组件时加载组件 | ReactNode             | --     | --   |
| hideControlbar | 是否隐藏控制栏           | boolean               | false  | --   |
| onCreated      | 播放器实例创建实例事件   | (player: any) => void | --     | --   |
| options        | aliplayer 的参数         | object                | --     | --   |
| onDwnload      | 点击下载的回调           | function              | --     | --   |
| showDwnload    | 是否显示下载入口         | boolean               | true   | --   |

Player options 説明

| 参数     | 说明                               | 类型    | 默认值 | 版本 |
| -------- | ---------------------------------- | ------- | ------ | ---- |
| height   | 播放器的高度                       | string  | 100%   | --   |
| width    | 播放器的宽度                       | string  | 100%   | --   |
| isLive   | 是否是直播(建议直接使用 Live 组件) | boolean | --     | --   |
| autoplay | 是否自动播放                       | boolean | --     | --   |
| rePlay   | 是否重复播放                       | boolean | --     | --   |
| preload  | 视频封面                           | string  | --     | --   |
