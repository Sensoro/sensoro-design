import { Select as AntSelect } from 'antd';
import InternalSelect from './select';

type InternalSelectType = typeof InternalSelect;

interface Select extends InternalSelectType {
  Option: typeof AntSelect.Option;
  OptGroup: typeof AntSelect.OptGroup;
}
const Select: Select = InternalSelect as Select;
Select.Option = AntSelect.Option;
Select.OptGroup = AntSelect.OptGroup;

export default Select;
