---
title: PermissionTreeSelect 权限树选择组件
nav:
  title: 业务组件
  path: /business
group:
  title: 数据录入
  path: /data-entry
---

# PermissionTreeSelect 权限树选择组件

对权限进行选择，支持 Form 组件

## 代码演示

### 简单示例

<code src="./demo/demo-01.tsx" />

### 表单使用

<code src="./demo/demo-02.tsx" />

### 只读模式

<code src="./demo/demo-03.tsx" />

## API

| 参数      | 说明         | 类型                        | 默认值 | 版本 |
| --------- | ------------ | --------------------------- | ------ | ---- |
| className | 额外的样式类 | `string`                    | --     | --   |
| style     | 额外的样式   | `CSSProperties`             | --     | --   |
| list      | 数据源       | `object[]`                  | --     | --   |
| loading   | 加载数据中   | `boolean`                   | --     | --   |
| disabled  | 是否禁用     | `boolean`                   | --     | --   |
| value     | 选中的权限值 | object[]                    | --     | --   |
| onChange  | 选中的权限值 | `(value: object[]) => void` | --     | --   |
