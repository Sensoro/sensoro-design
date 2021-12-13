---
title: TableTransfer 表格穿梭框
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
  path: /data-entry
---

# TableTransfer 表格穿梭框

使用 Table 作为穿梭框自定义渲染列表

## 代码演示

### 简单示例

<code src="./demo/demo-01.tsx" />

## API

文本链接的属性说明如下：

| 参数         | 说明              | 类型   | 默认值 | 版本 |
| ------------ | ----------------- | ------ | ------ | ---- |
| className   | 额外的样式类 | `string` | --   | --   |
| dataSource   | 数据源 | `any[]` | --   | --   |
| value   | 选中的数据 | `string[]` | --   | --   |
| titles   | 标题集合，顺序从左至右 | `React.ReactNode[]` | --   | --   |
| showSearch   | 是否显示搜索框 | `boolean` | `false`   | --   |
| tabelRowId   | 表格数据的唯一 ID | `string` | `id`   | --   |
| leftColumns  | 左侧表格列配置    | `Array`  | --     | --   |
| rightColumns | 右侧表格列配置    | `Array`  | --     | --   |
| tableProps   | 表格其他参数          | `Object` | --     | --   |
| locale   | 多语言配置 | `{ itemUnit: string; searchPlaceholder: string }` | -- | --|
| filterOption | 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false | `(inputValue, option): boolean` | -- | --|
| onChange   | 选项在两栏之间转移时的回调函数 | `(value: string[]) => void` | --     | --   |

table 相关 请查看 table 文档

**注意:** 使用此组件需要全量数据，不建议采用后端分页。如接口是分页接口，请使用组件库提供的方法将其转换为获取全量的方法

```
import createFetchAll from '@sensoro/sensoro-design/es/common/utils/create-fetch-all';

createFetchAll(fetchPage);
```
