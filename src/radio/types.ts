import Group from './group';
import Button from './button';

import type { RadioProps } from 'antd/es/radio';

export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group;
  Button: typeof Button;
}

export type { RadioProps };
