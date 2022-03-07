---
order: 2
nav:
  title: 设计
---

# 色彩

Sensoro Design 将色彩体系解读成两个层面：系统级色彩体系和产品级色彩体系。

系统级色彩体系主要定义了灵思中台设计中的基础色板、中性色板。产品级色彩体系则是在具体设计过程中，基于系统色彩进一步定义符合产品调性以及功能诉求的颜色。

## 系统级色彩体系

### 基础色板

```tsx
/**
 * inline: true
 * compact: true
 */
import React from 'react';
import { Palettes } from '../site';

export default () => {
  return <Palettes />;
};
```

### 中性色板

中性色包含灵思中后台的网页设计中大量使用的灰色，合理地选择中性色能够令页面信息具备良好的主次关系，助力阅读体验。

```tsx
/**
 * inline: true
 * compact: true
 */
import React from 'react';
import { Palette } from '../site';

export default () => {
  return <Palette color={{ name: 'grey', count: 10 }} direction="horizontal" />;
};
```
