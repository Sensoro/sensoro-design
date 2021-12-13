import { createContext } from 'react';

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
  aliplayerVersion: string;
}

export const ConfigContext = createContext<ConfigConsumerProps>({
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `sen-${suffixCls}` : 'sen';
  },
  aliplayerVersion: '2.8.2'
});

export const ConfigConsumer = ConfigContext.Consumer;
