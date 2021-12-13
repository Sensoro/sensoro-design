import React from 'react';
import classNames from '@pansy/classnames';
import { Menu, Dropdown } from 'antd';
import { DropDownProps } from 'antd/es/dropdown';
import { MenuProps } from 'antd/es/menu';
import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';
import { ConfigContext } from '../config-provider';

interface OptionData {
  title: string;
  value: string | number;
}

export interface DropdownSelectProps extends Partial<DropDownProps> {
  defaultValue?: OptionData['value'];
  options?: OptionData[];
  children: (title: OptionData['title']) => React.ReactNode;
  onChange?: (value: OptionData['value']) => void;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  overlayClassName,
  options = [],
  defaultValue,
  children,
  onChange,
  ...rest
}) => {
  const [current, setCurrent] = React.useState<OptionData>();
  const { getPrefixCls } = React.useContext(ConfigContext);

  React.useEffect(() => {
    if (options && options.length) {
      const value = defaultValue || options[0]?.value;
      setCurrent(options.find((item) => item.value === value));
    }
  }, [JSON.stringify(options), defaultValue]);

  const prefixCls = getPrefixCls('dropdown-select');
  const cls = classNames(overlayClassName, prefixCls);

  const handleClick: MenuProps['onClick'] = (param) => {
    const key = param.key;
    setCurrent(
      options.find((item) => {
        if (isNumber(item.value)) {
          return item.value === +key;
        } else {
          return item.value === key;
        }
      })
    );
    onChange?.(key);
  };

  const menu = (
    <Menu onClick={handleClick} selectedKeys={current?.value ? [current.value + ''] : []}>
      {options.map((item) => (
        <Menu.Item key={item.value}>{item.title}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown {...rest} overlay={menu} overlayClassName={cls}>
      {isFunction(children) && <span>{children(current?.title)}</span>}
    </Dropdown>
  );
};

DropdownSelect.defaultProps = {
  trigger: ['click']
};

export default DropdownSelect;
