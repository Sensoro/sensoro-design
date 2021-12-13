import { createContext } from 'react';

export interface MonitorConsumerProps {}

export const MonitorContext = createContext<MonitorConsumerProps>({});

export const MonitorConsumer = MonitorContext.Consumer;
