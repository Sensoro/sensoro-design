---
title: Table 表格
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data-display
---

# Table 表格

表格。

## 代码演示

### 配合 useBatch

<code src="./demo/use-batch.tsx" />

### 在 transfer 里面使用

<code src="./demo/transfer.tsx" />

### filterColumns 示例

<code src="./demo/filter-columns.tsx" />

### Table 示例

<code src="./demo/table.tsx" />

### 配合 useTable

<code src="./demo/use-table.tsx" />

## API

## table props

| 参数                | 说明                                           | 类型                                                           | 默认值    | 备注                                                                                                         |
| ------------------- | ---------------------------------------------- | -------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| title               | 表格标题                                       | string                                                         | -         | 不传 title 属性表格 header 不会显示                                                                          |
| searchProps         | 搜索组件的参数                                 | SearchProps(和 input 的 search 完全一致)                       | -         | 如果使用了 table 参数 onSearch 会被 useTable 接管，onSearch 不会生效                                         |
| batchOption         | 批处理相关参数                                 | {options: object[], onOptionClick: Function, cancel: Function} | -         | 具体用法参考 demo                                                                                            |
| mainOption          | 主菜单相关参数                                 | {options: object[], onOptionClick: Function}                   | -         | 具体用法参考 demo                                                                                            |
| table               | 表格的 hook                                    | UseTableResult                                                 | -         | 通过 Table.useTable 获取                                                                                     |
| batch               | 批处理的 hook                                  | UseBatchResult                                                 | -         | 通过 Table.useBatch 获取(使用方式详见用例)                                                                   |
| disableSearch       | 禁用搜索框                                     | boolean                                                        | false     | 主要是是 search 配合 useTable 一起用比较方便，所以把搜索框和 useTable 绑定在一起，但是也提供禁用搜索框的属性 |
| onBatchOptionChange | batchOption 不为空时生效，切换批处理菜单的回调 | (mode: false\|string)=>void                                    | -         |                                                                                                              |
| rangePickerProps    | 使用时间选择组件                               | true\| DataRangeProps \| undefined                             | undefined |                                                                                                              |

## column props

| 参数          | 说明                       | 类型    | 默认值 | 备注                                                                                                        |
| ------------- | -------------------------- | ------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| option        | 是否操作项                 | boolean | false  | 值为 true 的时候表示该列为操作列，其子节点默认操作 3 个会被默认收起，而且不会出现在 columnFilter 的选项里面 |
| filterColumn  | 是否出现在过滤列表里面     | boolean | false  |                                                                                                             |
| defaultFilter | 是否在过滤列表里面默认选中 | boolean | false  |                                                                                                             |

其他用法和 antd 完全一致：

https://ant.design/components/table-cn/
