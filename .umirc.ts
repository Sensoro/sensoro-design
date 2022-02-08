import { join } from 'path';

const baseUrl = '/sensoro-design';

export default {
  mode: 'site',
  title: 'Sensoro Design',
  base: baseUrl,
  publicPath: `${baseUrl}/`,
  favicon: `${baseUrl}/logo.svg`,
  logo: `${baseUrl}/logo.svg`,
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
