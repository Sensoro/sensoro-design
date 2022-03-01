---
title: Button 按钮
nav:
  title: 组件
  path: /components
group:
  title: 通用
  path: /general
  order: 1
---

# Button 按钮

按钮用于开始一个即时操作。

## 代码演示

### 按钮类型

<code src="./demo/demo01.tsx" />

### 图标按钮

<code src="./demo/demo02.tsx" />

### 警告按钮

<code src="./demo/demo08.tsx" />

### 危险按钮

<code src="./demo/demo03.tsx" />

### 按钮尺寸

<code src="./demo/demo04.tsx" />

### 加载中状态

<code src="./demo/demo05.tsx" />

### Block 按钮

<code src="./demo/demo06.tsx" />

### 分组按钮

<code src="./demo/demo07.tsx" />

## API

| 属性     | 说明                                                                                                                                 | 类型                                                                                          | 默认值    | 版本 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | --------- | ---- |
| block    | 将按钮宽度调整为其父宽度的选项                                                                                                       | `boolean`                                                                                     | `false`   | --   |
| danger   | 设置危险按钮                                                                                                                         | `boolean`                                                                                     | `false`   |      |
| disabled | 按钮失效状态                                                                                                                         | `boolean`                                                                                     | `false`   |      |
| ghost    | 幽灵属性，使按钮背景透明                                                                                                             | `boolean`                                                                                     | `false`   |      |
| href     | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致                                                                                | `string`                                                                                      | -         |      |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string                                                                                        | `button`  |      |
| icon     | 设置按钮的图标组件                                                                                                                   | ReactNode                                                                                     | -         |      |
| loading  | 设置按钮载入状态                                                                                                                     | `boolean` \| `{ delay: number }`                                                              | `false`   |      |
| shape    | 设置按钮形状                                                                                                                         | `default` \| `circle` \| `round`                                                              | `default` |      |
| size     | 设置按钮大小                                                                                                                         | `large` \| `middle` \| `small`                                                                | `middle`  |      |
| target   | 相当于 a 链接的 target 属性，href 存在时生效                                                                                         | string                                                                                        | -         |      |
| type     | 设置按钮类型                                                                                                                         | `primary` \| `ghost` \| `dashed` \| `link` \| `text` \| `default` \| `secondary` \| `warning` | `default` |      |
| onClick  | 点击按钮时的回调                                                                                                                     | (event) => void                                                                               | -         |      |

支持原生 button 的其他所有属性。
