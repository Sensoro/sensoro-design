import { join } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  mode: 'site',
  title: 'Sensoro Design',
  favicon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  resolve: {
    includes: ['docs', 'src']
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
  ],
  theme: {
    '@primary-color': '#2B6DE5'
  }
};
