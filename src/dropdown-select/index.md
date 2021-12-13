---
title: DropdownSelect 下拉选择
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data-display
---

# DropdownSelect 下拉选择

## 代码演示

### 按照字符数省略

<code src="./demo/demo-01.tsx" />

## API

| 参数         | 说明       | 类型                        | 默认值 | 版本 |
| ------------ | ---------- | --------------------------- | ------ | ---- |
| defaultValue | 默认值     | `string` \| `number`        | --     | --   |
| options      | 选项配置   | `Array`                     | []     | --   |
| children     | 子元素渲染 | (text: string) => ReactNode | --     | --   |
| onChange     | 切换选项   | (value) => void             | --     | --   |

options 数据格式

```
{
  title: string;
  value: string | number;
}
```

其他用法和 antd 完全一致：

https://ant.design/components/dropdown-cn/
