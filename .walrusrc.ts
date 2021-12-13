import { Config } from '@walrus/types';

const config: Config = {
  entry: {
    ignore: [
      '.umi',
      '.umi-production',
      '_utils',
      'components',
      'hooks',
      'interface',
      'theme',
      'style'
    ]
  }
};

export default config;
