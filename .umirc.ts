import { join } from 'path';

export default {
  mode: 'site',
  title: 'Sensoro Design',
  base: '/sensoro-design',
  publicPath: '/sensoro-design/',
  favicon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
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
