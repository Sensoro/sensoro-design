---
title: Tag 标签
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data-display
  order: 5
---

# Tab 标签

进行标记和分类的小标签。

## 代码演示

### 简单示例

<code src="./demo/demo-01.tsx" />

### icon

<code src="./demo/demo-04.tsx" />

### 指定数量

<code src="./demo/demo-02.tsx" />

### 自适应

<code src="./demo/demo-02.tsx" />

## API

文本链接的属性说明如下：

| 参数       | 说明     | 类型    | 默认值 | 版本 |
| ---------- | -------- | ------- | ------ | ---- |
| multicolor | 多彩模式 | boolean | false  | --   |

其他参数请查看 [tag-cn](https://ant.design/components/tag-cn/)

List

| 参数      | 说明                         | 类型          | 默认值 | 版本 |
| --------- | ---------------------------- | ------------- | ------ | ---- |
| className | 额外的样式类                 | string        | --     | --   |
| style     | 额外的样式                   | CSSProperties | --     | --   |
| list      | 配置数据                     | array         | []     | --   |
| max       | 显示的最大数目               | number        | 3      | --   |
| flexible  | 是否根据容器宽度动态显示 tag | boolean       | false  | --   |

**配置数据类型**

```ts
{
  text: string;
  icon?: ReactNode;
  color?: string;
}
```
