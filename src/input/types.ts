import { Input } from 'antd';
import Search from './search';

import type { InputProps } from 'antd/es/input';

export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLElement>> {
  __SEN_INPUT: boolean;
  Search: typeof Search;
  Group: typeof Input.Group;
}
