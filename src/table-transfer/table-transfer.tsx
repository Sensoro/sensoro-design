import React, { useState, useEffect, useContext, useMemo } from 'react';
import classNames from '@pansy/classnames';
import { Input } from 'antd';
import Table from '../table';
import { ConfigContext } from '../config-provider';
import { TableProps } from '../table/types';

export interface Locale {
  itemUnit?: string;
  searchPlaceholder?: string;
}

export interface TableTransferProps<RecordType = any> {
  /** 额外的样式类 */
  className?: string;
  /** 数据源 */
  dataSource?: RecordType[];
  /** 选中的数据 */
  value?: string[];
  /** 标题集合，顺序从左至右 */
  titles?: React.ReactNode[];
  /**
   * 是否显示搜索框
   * @default false
   */
  showSearch?: boolean;
  /** 左侧列配置 */
  leftColumns?: TableProps<RecordType>['columns'];
   /** 右侧列配置 */
  rightColumns?: TableProps<RecordType>['columns'];
  /**
   * 指定ID标识字段
   * @default 'id'
   * */
  tabelRowId?: string;
  /**
   * 表格配置
   */
  tableProps?: Omit<TableProps<RecordType>, 'columns'>;
  locale?: Locale;
  /** 过滤函数 */
  filterOption?: (inputValue: string, option: RecordType) => boolean;
  onChange?: (value: string[]) => void;
}

const defaultLocale = {
  itemUnit: '项',
  searchPlaceholder: '请输入搜索内容'
}

function TableTransfer<RecordType extends object = any>({
  className,
  value = [],
  titles = [],
  locale = {},
  tabelRowId = 'id',
  dataSource = [],
  leftColumns = [],
  rightColumns = [],
  tableProps = {},
  showSearch = false,
  onChange,
  filterOption
}: TableTransferProps<RecordType>) {
  const latestLocale = {
    ...defaultLocale,
    ...locale
  };
  const [leftFilterVal, setLeftFilterVal] = useState<string>();
  const [rightFilterVal, setRightFilterVal] = useState<string>();
  /** 原有数据 */
  const [leftDataSource, setLeftDataSource] = useState<RecordType[]>([]);
  /** 选中的数据 */
  const [rightDataSource, setRightDataSource] = useState<RecordType[]>([]);
  const { getPrefixCls } = useContext(ConfigContext);

  useEffect(
    () => {
      setLeftDataSource(dataSource.map(item => {
        const newItem = {...item}
        if (value.includes(item[tabelRowId])) {
          newItem['disabled'] = true;
        }
        return newItem;
      }));

      setRightDataSource(() => {
        return value
          .map((key: string) => dataSource.find((item) => item?.[tabelRowId] === key))
          .filter((item) => item)
      });
    },
    [JSON.stringify(dataSource), JSON.stringify(value)]
  );

  const prefixCls = getPrefixCls('table-transfer');

  const handleLeftSelect = (data: RecordType) => {
    setLeftDataSource((prev) => prev.map((item) => {
      if (item[tabelRowId] === data[tabelRowId]) {
        item['disabled'] = true;
      }
      return item;
    }));

    setRightDataSource((prev) => {
      let nextValue = [];
      if (prev.find((item) => item[tabelRowId] === data[tabelRowId])) {
        nextValue = [...prev];
      }

      nextValue = [data, ...prev];

      handleChange(nextValue);
      return nextValue;
    });
  }

  const handleRightSelect = (data: RecordType) => {
    setLeftDataSource((prev) => prev.map((item) => {
      if (item[tabelRowId] === data[tabelRowId]) {
        item['disabled'] = false;
      }
      return item;
    }));

    setRightDataSource((prev) => {
      const nextValue = prev.filter(item => {
        return item[tabelRowId] !== data[tabelRowId];
      });
      handleChange(nextValue);
      return nextValue;
    });
  }

  const handleChange = (list: RecordType[]) => {
    onChange?.(list.map(item => item[tabelRowId]).filter((i) => i));
  }

  const leftTable = useMemo(
    () => {
      return (
        <Table
          rowKey={tabelRowId}
          dataSource={
            (filterOption && leftFilterVal)
              ? leftDataSource.filter((item) => filterOption(leftFilterVal, item))
              : leftDataSource
          }
          columns={leftColumns}
          loading={tableProps.loading}
          size="small"
          rowSelection={{
            getCheckboxProps: (item) => ({ disabled: item.disabled }),
            onSelectAll(selected, selectedRows) {
              if (selected) {
                selectedRows.filter(item => !item['disabled']).forEach(handleLeftSelect);
              }
            },
            onSelect(item, selected) {
              if (selected) {
                handleLeftSelect(item);
              }
            },
            selectedRowKeys: rightDataSource.map(item => item[tabelRowId])
          }}
          {...tableProps}
        />
      )
    },
    [leftDataSource, tableProps.loading, leftFilterVal]
  );

  const rightTable = useMemo(
    () => {
      return (
        <Table
          rowKey={tabelRowId}
          dataSource={
            (filterOption && rightFilterVal)
              ? rightDataSource.filter((item) => filterOption(rightFilterVal, item))
              : rightDataSource
          }
          columns={rightColumns}
          loading={tableProps.loading}
          size="small"
          rowSelection={{
            onSelectAll(selected, selectedRows) {
              if (selected) {
                selectedRows.forEach(handleRightSelect);
              }
            },
            onSelect(item, selected) {
              if (selected) {
                handleRightSelect(item);
              }
            },
            selectedRowKeys: [],
          }}
          {...tableProps}
        />
      )
    },
    [rightDataSource, tableProps.loading, rightFilterVal]
  );

  return (
    <div className={classNames(className, prefixCls)}>
      <div className={`${prefixCls}-list`} key="left">
        <div className={`${prefixCls}-list-header`}>
          <span className={`${prefixCls}-list-header-selected`}>
            {dataSource.length - rightDataSource.length}/{dataSource.length}
            {latestLocale.itemUnit}
          </span>
          <div className={`${prefixCls}-list-header-title`}>
            {titles[0] && titles[0]}
          </div>
        </div>
        <div className={`${prefixCls}-list-body`}>
          {(showSearch && filterOption) && (
            <div className={`${prefixCls}-list-body-search`}>
              <Input
                placeholder={latestLocale.searchPlaceholder}
                value={leftFilterVal}
                onChange={(e) => {
                  setLeftFilterVal(e.target.value);
                }}
              />
            </div>
          )}
          <div className={`${prefixCls}-list-content`}>
            {leftTable}
          </div>
        </div>
      </div>
      <div className={`${prefixCls}-list`} key="right">
        <div className={`${prefixCls}-list-header`}>
          <span className={`${prefixCls}-list-header-selected`}>
            {rightDataSource.length}{latestLocale.itemUnit}
          </span>
          <div className={`${prefixCls}-list-header-title`}>
            {titles[1] && titles[1]}
          </div>
        </div>
        <div className={`${prefixCls}-list-body`}>
          {(showSearch && filterOption) && (
            <div className={`${prefixCls}-list-body-search`}>
              <Input
                placeholder={latestLocale.searchPlaceholder}
                value={rightFilterVal}
                onChange={(e) => {
                  setRightFilterVal(e.target.value);
                }}
              />
            </div>
          )}
          <div className={`${prefixCls}-list-content`}>
            {rightTable}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableTransfer;
