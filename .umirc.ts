export default {
  mode: 'site',
  title: 'Sensoro Design',
  favicon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  base: '/design/',
  publicPath: '/design/',
  resolve: {
    includes: ['docs', 'src']
  },
  navs: [
    null,
    {
      title: 'GitLab',
      path: 'https://gitlab.sensoro.com/IoTApps/frontend/sensoro-design'
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
    ],
    [
      'import',
      {
        libraryName: '@sensoro/sensoro-design',
        customStyleName: () => {
          return `../style/index.ts`;
        },
      },
      '@sensoro/sensoro-design',
    ],
  ],
  theme: {
    '@primary-color': '#2B6DE5'
  }
};
