import { Config } from '@walrus/types';

const config: Config = {
  release: {
    buildCommand: 'build:lib'
  },
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
