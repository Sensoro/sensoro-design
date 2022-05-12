import React from 'react';
import { find } from 'lodash';
import { Select, Button, Checkbox, DatePicker, Dropdown, Menu } from 'antd';
import Options from '../options';
import { HeaderProps, OptionItem } from './types';
import classnames from '@pansy/classnames';
import Icon from '../icon';
import './style/index.less';
import { Search } from '../input/search';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Header: React.FC<HeaderProps> = (props) => {
  const {
    className,
    prefixCls,
    style,
    title,
    batchOption = { options: null, onOptionClick: null },
    mainOption = { options: null, onOptionClick: null },
    searchProps,
    rangePickerProps,
    columns,
    selectedRows,
    setEnableColumns,
    batchMode,
    setBatchMode,
    batchOptionSelected,
    setBatchOptionSelected
  } = props;

  //转为受控
  // const [batchOptionSelected, setBatchOptionSelected] = React.useState<OptionItem>();

  const { options, onOptionClick } = batchOption;

  const cancel = () => {
    setBatchMode(false);
    setBatchOptionSelected(null);
  };

  const createMenu = () => (
    <Menu
      onClick={({ key }) => {
        const opt = find(options, (o) => o.value === key);
        setBatchOptionSelected(opt);
        setBatchMode(key as string);
      }}
    >
      {options && options.map((i) => <Menu.Item key={i.value}>{i.label}</Menu.Item>)}
    </Menu>
  );

  return (
    <div
      className={classnames({
        [`${prefixCls}-header`]: true,
        [className]: true
      })}
      style={style}
    >
      <div
        className={classnames({
          [`${prefixCls}-wrap`]: true
        })}
      >
        <span
          className={classnames({
            [`${prefixCls}-title`]: true
          })}
        >
          {title}
        </span>
        <div
          className={classnames({
            [`${prefixCls}-toolbar`]: true
          })}
        >
          {searchProps && <Search style={{ width: 224 }} {...searchProps} />}
          {rangePickerProps && <RangePicker style={{ marginLeft: 8 }} {...rangePickerProps} />}
          {columns && columns.length > 0 && (
            <Select
              style={{ width: 32, marginLeft: 8, padding: 0 }}
              placeholder={<Icon type={'icon-liebiao'} />}
              showArrow={false}
              dropdownMatchSelectWidth={false}
              dropdownRender={(menus) => {
                return (
                  <div>
                    <div
                      className={classnames({
                        [`${prefixCls}-checkbox-tip`]: true
                      })}
                    >
                      在表格中展示
                    </div>
                    <Checkbox.Group
                      style={{ padding: '8px 0px', width: '100%' }}
                      defaultValue={
                        columns &&
                        (columns.filter((i) => i.defaultFilter).map((i) => i.dataIndex) as any)
                      }
                      onChange={(checkedValues: string[]) => setEnableColumns(checkedValues)}
                    >
                      {columns &&
                        columns.map((i, idx) => (
                          <div
                            key={idx}
                            className={classnames({
                              [`${prefixCls}-filter-item`]: true
                            })}
                          >
                            <Checkbox value={i.dataIndex}>{i.title}</Checkbox>
                          </div>
                        ))}
                    </Checkbox.Group>
                  </div>
                );
              }}
            ></Select>
          )}

          {options && options.length > 0 && (
            <Dropdown overlay={createMenu()}>
              <Button style={{ width: 110, marginLeft: 8 }}>
                批量操作
                <Icon type={'icon-down'} />
              </Button>
            </Dropdown>
          )}
          {mainOption?.options?.length > 0 && (
            <Options
              type={'button'}
              options={mainOption?.options}
              // style={{ marginLeft: 8 }}
              onClick={mainOption?.onOptionClick}
            />
          )}
        </div>
      </div>
      {batchMode && (
        <div
          className={classnames({
            [`${prefixCls}-batch-option`]: true
          })}
        >
          <span>
            已选中
            <a style={{ margin: '0 4px', cursor: 'auto' }}>{selectedRows?.length}</a>项
          </span>
          {batchOptionSelected && (
            <div>
              <Button size={'small'} onClick={cancel}>
                取消
              </Button>
              <Button
                size={'small'}
                danger={!!batchOptionSelected.danger}
                type={batchOptionSelected?.type || 'default'}
                style={{ marginLeft: 8 }}
                disabled={!(selectedRows && selectedRows.length > 0)}
                onClick={() =>
                  onOptionClick &&
                  onOptionClick(
                    batchOptionSelected.value,
                    batchOptionSelected,
                    selectedRows,
                    cancel
                  )
                }
              >
                {batchOptionSelected.label}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
