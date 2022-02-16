import { join } from 'path';

const baseUrl = '/sensoro-design';
const logo = 'https://cdn.jsdelivr.net/gh/wangxingkang/pictures@latest/imgs/sensoro-design.svg';

export default {
  mode: 'site',
  title: 'Sensoro Design',
  favicon: logo,
  logo,
  resolve: {
    includes: ['docs']
  },
  alias: {
    '@sensoro/sensoro-design': join(__dirname, 'src')
  },
  navs: [
    null,
    {
      title: '友情链接',
      children: [
        { title: 'AMap', path: 'https://amap.xingkang.wang' },
        { title: 'Watermark', path: 'https://watermark.xingkang.wang' },
        { title: 'Hooks', path: 'https://hooks.xingkang.wang' }
      ]
    },
    {
      title: 'GitHub',
      path: 'https://github.com/sensoro-design/sensoro-design'
    }
  ],
  dynamicImport: {},
  hash: true,
  nodeModulesTransform: {
    type: 'none',
    exclude: []
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
      }
    ]
  ]
};