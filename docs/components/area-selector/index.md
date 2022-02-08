---
title: AreaSelector 区域选择
nav:
  title: 组件
  path: /components
group:
  title: 操作组件
  path: /operation
  order: 1
---

# AreaSelector 区域选择

用于打点和显示框选区域信息。支持表单，如果有数据结构的兼容性问题可以封装高阶组件来解决

## 代码演示

### 展示模式

<code src="./demo/sample.tsx" />

### 编辑模式

<code src="./demo/editor.tsx" />

### AreaSelectorProps

| 参数            | 说明                                | 类型                                                     | 默认值                                                                 | 备注                                                              |
| --------------- | ----------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| className       | 容器的 className                    | string                                                   | -                                                                      |                                                                   |
| style           | 容器的 style                        | CSSProperties                                            | -                                                                      |                                                                   |
| width           | canvas 的宽(非容器)                 | number                                                   | -                                                                      | 必填                                                              |
| height          | canvas 的高(非容器)                 | number                                                   | -                                                                      | 必填                                                              |
| editor          | 是否编辑模式                        | boolean                                                  | false                                                                  |                                                                   |
| value           | 受控值                              | boolean                                                  | false                                                                  |                                                                   |
| onChange        | canvas 面板图形发生变化会调用该方法 | boolean                                                  | false                                                                  |                                                                   |
| minPoint        | 支持的图形最小点数                  | number                                                   | 3                                                                      |                                                                   |
| maxPoint        | 支持的图形最大点数                  | number                                                   | 10                                                                     | 达到最大点数自动闭合，调用 onChange 方法                          |
| disablePolygon  | 禁用多边形                          | boolean                                                  | false                                                                  |                                                                   |
| textAline       | 文本位置                            | 'default' \| 'center'                                    | 'default'                                                              |                                                                   |
| shapeStyle      | 图形样式                            | {fillStyle:string, strokeStyle:string, lineWidth:number} | {fillStyle:'rgba(255, 0, 0, 0.2)', strokeStyle:'#ff0000', lineWidth:2} | 注意改属性也可以和 value 一同传入，达到每个图形样式不同的效果     |
| labelStyle      | 文本样式                            | {font?:string, fillStyle?:string, textStyle?:string}     | {font:'12px serif', fillStyle:'#0D1014', textStyle:"#fff"}             | 注意改属性也可以和 value 一同传入，达到每个图形样式不同的效果     |
| editableMaxSize | 同时可编辑的图形个数                | number                                                   | 1                                                                      |                                                                   |
| axis            | 生成的坐标比例                      | {width:number,height:number}                             | {width:1920, height: 1080}                                             | 如果传入的 width 和 height 和这个 axis 的宽高比差距过大会停止渲染 |
