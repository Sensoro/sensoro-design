<div align="center">
  <h1>SENSORO 组件库</h1>
  
  <p align="center">
    <a href="https://npmcharts.com/compare/@sensoro/sensoro-design?minimal=true">
      <img src="https://img.shields.io/npm/dm/@sensoro/sensoro-design.svg?style=flat" alt="Downloads">
    </a>
    <a href="https://npmjs.org/package/@sensoro/sensoro-design">
      <img src="https://img.shields.io/npm/v/@sensoro/sensoro-design.svg?style=flat" alt="Version">
    </a>
  </p>
</div>

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
```

## ⌨️ 本地开发

```bash
# 克隆项目到本地
git clone git@gitlab.sensoro.com:IoTApps/sensoro-ui.git

# 安装依赖
yarn

# 启动服务
yarn start
```

## 在其他项目联调

```sh
# 执行编译
yarn run build:lib

# 在组件库项目目录执行
yarn link

# 在需要调试的项目执行
yarn link "@sensoro/sensoro-design"
```

打开浏览器访问 http://localhost:8000
