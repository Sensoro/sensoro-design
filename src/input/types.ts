import { Search } from './search';
import { Group } from './group';
import { Password } from './password';

import type { InputProps } from 'antd/es/input';

export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLElement>> {
  __SEN_INPUT: boolean;
  Search: typeof Search;
  Group: typeof Group;
  Password: typeof Password;
}
