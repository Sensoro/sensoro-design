import { join } from 'path';

const baseUrl = '/sensoro-design';
const logo = 'https://cdn.jsdelivr.net/gh/wangxingkang/pictures@latest/imgs/sensoro-design.svg';

export default {
  mode: 'site',
  title: 'Sensoro Design',
  base: baseUrl,
  publicPath: `${baseUrl}/`,
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
      title: 'GitHub',
      path: 'https://github.com/SensoroFE/sensoro-design'
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
