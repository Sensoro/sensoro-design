---
title: Schedule 时间段选择
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
  path: /data-entry
---

# Schedule 时间段选择

## 代码演示

### 简单示例

<code src="./demo/demo-01.tsx" />

### 只读示例

<code src="./demo/demo-02.tsx" />

### Slider 简单示例

<code src="./demo/demo-03.tsx" />

### Slider 只读示例

<code src="./demo/demo-04.tsx" />

## API

Schedule/Schedule.Slider

| 参数           | 说明                 | 类型                                                      | 默认值        | 版本   |
| -------------- | -------------------- | --------------------------------------------------------- | ------------- | ------ |
| className      | 额外的样式类         | string                                                    | --            | --     |
| style          | 额外的样式           | CSSProperties                                             | --            | --     |
| unit           | 时间的单位           | 'millisecond' \| 'second' \| 'minute' \| 'text' \| 'time' | `millisecond` | --     |
| autoMerge      | 开启合并模式         | `boolean`                                                 | `false`       | --     |
| value          | 值                   | array                                                     | --            | --     |
| timesMaxLength | 每天最大的时间段数目 | number                                                    | 8             | --     |
| isReadOnly     | 是否是只读状态       | boolean                                                   | false         | 1.2.2+ |
| onChange       | 被修改的回调         | (value: array) => void                                    | --            | --     |

Schedule

| 参数     | 说明         | 类型                   | 默认值 | 版本 |
| -------- | ------------ | ---------------------- | ------ | ---- |
| value    | 值           | array                  | --     | --   |
| onChange | 被修改的回调 | (value: array) => void | --     | --   |

**value**

- day 取值为 1-7， 分别代表周几，需保证不存在重复天数。
- start/end, 取值范围
  - minute: [0, 1439]
  - second: [0, 1439 x 60]
  - millisecond: [0, 1439 x 60 x 1000]
  - text: [0, 2359]
  - time: ['00:00', '23:59']

end 应大于 start。表示本天的第几分钟 即 0 表示 `00:00` 1 表示 `00:01`

```
{
  day: number,
  timeArray: {
    start: number;
    end: number;
  }[]
}[];
```

举例：

```
[
  {
    day: 1,
    timeArray: [
      { start: 0, end: 300 },
      { start: 500, end: 600 },
      { start: 700, end: 1439 }
    ]
  },
  {
    day: 2,
    timeArray: [
      { start: 500, end: 600 }
    ]
  },
  {
    day: 7,
    timeArray: [
      { start: 0, end: 1439 }
    ]
  },
]
```

Schedule.Slider

| 参数       | 说明                     | 类型                   | 默认值 | 版本 |
| ---------- | ------------------------ | ---------------------- | ------ | ---- |
| internal   | 是否是内部调用(请勿设置) | boolean                | false  | --   |
| initChange | 是否初次调用 onChange    | boolean                | true   | --   |
| value      | 值                       | array                  | --     | --   |
| onChange   | 被修改的回调             | (value: array) => void | --     | --   |

**value**

```
{
  start: number;
  end: number;
}[]
```

举例：

```
[
  { start: 0, end: 300 },
  { start: 500, end: 600 },
  { start: 700, end: 1439 }
]
```
