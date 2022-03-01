import { Select } from 'antd';

import type { SelectProps } from 'antd/es/select';

export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLElement>> {
  __SEN_SELECT: boolean;
  Option: typeof Select.Option;
  OptGroup: typeof Select.OptGroup;
}
