<p align="center">
  <a href="https://design.sensoro.com">
    <img width="200" src="https://cdn.jsdelivr.net/gh/wangxingkang/pictures@latest/imgs/sensoro-design.svg">
  </a>
</p>

<h1 align="center">Sensoro Design</h1>

<p align="center">
  <a href="https://npmcharts.com/compare/@sensoro/sensoro-design?minimal=true">
    <img src="https://img.shields.io/npm/dm/@sensoro/sensoro-design.svg?style=flat" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/@sensoro/sensoro-design">
    <img src="https://img.shields.io/npm/v/@sensoro/sensoro-design.svg?style=flat" alt="Version">
  </a>
</p>

## ✨ 特性

- 🚀 TypeScript: 使用 TypeScript 编写，提供完整的类型定义。
- 💎 优雅美观: 基于 Ant Design。
- 🎉 开箱即用: 高质量的 React 组件。
- ⚡️ 按需加载: 支持按需加载，具体请查看[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

## 📦 安装

```
// npm
npm install @sensoro/sensoro-design --save

// yarn
yarn add @sensoro/sensoro-design

// pnpm
pnpm install @sensoro/sensoro-design
```

## ⌨️ 本地开发

本仓库使用 [pnpm](https://pnpm.io/zh) 进行依赖管理，开发前请保证已安装

```bash
# 克隆项目到本地
git clone git@github.com:sensoro-design/sensoro-design.git

# 安装依赖
yarn

# 启动服务
yarn start
```

## 在其他项目联调

```sh
# 执行编译
pnpm build:lib

# 在组件库项目目录执行
pnpm link --global

# 在需要调试的项目执行
pnpm link --global @sensoro/sensoro-design
```

打开浏览器访问 http://localhost:8888
