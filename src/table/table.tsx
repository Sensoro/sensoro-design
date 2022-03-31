import React, { useEffect } from 'react';
import classnames from '@pansy/classnames';
import { Table as AntTable } from 'antd';
import { TableProps, ColumnType } from './types';
import Header from './header';
import Options from '../options';
import Icon from '../icon';
import { unionBy, find } from 'lodash';
import NoField from '../no-field';
import useBatch from './use-batch';
import moment from 'moment';
import './style/index.less';

//这个基本不会有重名的情况发生，先简单这样写
const defaultPrefixCls = 'sen-table';

//把columns分类,最后得到一个数组，第一项存放一直显示的列，第二项存放筛选的列，第三列存放option列
const useColumns = (
  columns: ColumnType<any>[] = []
): [ColumnType<any>[], ColumnType<any>[], ColumnType<any>[]] =>
  columns.reduce(
    (prev: any, c) => {
      if (c.option) {
        prev[2].push(c);
      } else if (c.filterColumn || c.defaultFilter) {
        prev[1].push(c);
      } else {
        prev[0].push(c);
      }
      return prev;
    },
    [[], [], []]
  );

const sortColumns = (columns: ColumnType<any>[] = [], SrcColumns: ColumnType<any>[] = []) => {
  return SrcColumns.map((i) =>
    find(columns, (o) => (o.key ? o.key === i.key : o.dataIndex && o.dataIndex === i.dataIndex))
  ).filter((i) => i);
};

const Table: React.FC<TableProps<any>> = (props) => {
  const {
    className,
    style,
    prefixCls,
    dataSource,
    columns,
    pagination,
    rowSelection,
    //header的参数
    title,
    batchOption,
    mainOption,
    searchProps,
    rangePickerProps,
    disableSearch,
    onBatchOptionChange,
    table = {
      queryData: null,
      tableProps: {} as any,
      handleSearch: null,
      handleRangePicker: null
    },
    rowKey = 'key',
    batch = useBatch(),
    ...restProps
  } = props;

  useEffect(
    () => {
      if (dataSource?.length === 0 && table.queryData && table.queryData.page !== 1) {

        // @ts-ignore
        table.setQueryData({
          ...table.queryData,
          page: table.queryData.page - 1,
        });
      }
    },
    [dataSource]
  )

  const isFixed = columns.some((i) => i.fixed);

  const modifiedFilterIconColumns =
    columns &&
    columns.map((i) => ({
      ...i,
      render: (text, recode, idx) => {
        if (i.option) {
          return i?.render(text, recode, idx);
        } else {
          if (i?.render) {
            return <NoField>{i?.render(text, recode, idx)}</NoField>;
          } else {
            return <NoField>{text}</NoField>;
          }
        }
      },
      filterIcon: (filtered) => (
        <Icon type={'icon-filter'} className={classnames({ ['filtered']: filtered })} />
      )
    }));

  const [simpleColumns, filterColumns, optionColumns] = useColumns(modifiedFilterIconColumns);

  const [enableColumns, setEnableColumns] = React.useState(
    filterColumns && filterColumns.filter((i) => i.defaultFilter).map((i) => i.dataIndex)
  );

  const {
    selectedRows,
    setSelectedRows,
    batchMode,
    setBatchMode,
    batchOptionSelected,
    setBatchOptionSelected
  } = batch;
  const { queryData, tableProps, handleSearch, handleRangePicker } = table;

  const { pagination: tablePaginationProps, ...restTableProps } = tableProps;
  //时间范围选择

  const _rangePickerProps =
    rangePickerProps &&
    (typeof rangePickerProps === 'boolean'
      ? {
          defaultValue:
            queryData?.startTime && queryData?.endTime
              ? [moment(queryData?.startTime), moment(queryData?.endTime)]
              : undefined,
          onChange: handleRangePicker
        }
      : {
          defaultValue:
            queryData?.startTime && queryData?.endTime
              ? [moment(queryData?.startTime), moment(queryData?.endTime)]
              : undefined,
          ...rangePickerProps,
          onChange: (dates) => {
            //@ts-ignore
            rangePickerProps?.onChange?.(dates);
            handleRangePicker?.(dates);
          }
        });

  const total = dataSource && dataSource.length;
  const defaultPagination = {
    total: total,
    showSizeChanger: true,
    showTotal: (total) => `共${total}条`,
    pageSizeOptions: ['10', '50', '100']
  };

  const optionsColumnsWrap =
    optionColumns &&
    optionColumns.map((c) => ({
      ...c,
      render: (text, record, index) => {
        return (
          <Options type={'link'} autoHide={true}>
            {c?.render(text, record, index)}
          </Options>
        );
      }
    }));

  const onSelect = (record, selected) => {
    const key = typeof rowKey === 'function' ? rowKey(record) : rowKey;
    if (selected) {
      //求两个数组交集
      const currentRows = unionBy(selectedRows, [record], key);
      setSelectedRows(currentRows);
      rowSelection?.onRowSelectionChange?.(currentRows);
    } else {
      const currentRows = selectedRows.filter((i) => i[key] !== record[key]);
      setSelectedRows(currentRows);
      rowSelection?.onRowSelectionChange?.(currentRows);
    }
  };

  const onSelectAll = (selected, currentSelectedRows, changeRows) => {
    if (selected) {
      //求两个数组交集
      let currentRows = [].concat(selectedRows);
      changeRows &&
        changeRows.forEach((row) => {
          const key = typeof rowKey === 'function' ? rowKey(row) : rowKey;
          currentRows = unionBy(currentRows, [row], key);
        });
      setSelectedRows(currentRows);
      rowSelection?.onRowSelectionChange?.(currentRows);
    } else {
      const currentRows = selectedRows.filter((i) => {
        const key = typeof rowKey === 'function' ? rowKey(i) : rowKey;
        const findItem = find(changeRows, (o) => {
          const keyCompare = typeof rowKey === 'function' ? rowKey(o) : rowKey;
          if (!!o[keyCompare] && o[keyCompare] === i[key]) {
            return true;
          } else {
            return false;
          }
        });
        return !findItem;
      });
      setSelectedRows(currentRows);
    }
  };

  const rowSelectionWrap = rowSelection
    ? {
        selectedRowKeys:
          selectedRows &&
          selectedRows.map((i) => {
            const key = typeof rowKey === 'function' ? rowKey(i) : rowKey;
            return i[key];
          }),
        ...rowSelection,
        onSelect: (record, selected, selectedRows, nativeEvent) => {
          rowSelection?.onSelect?.(record, selected, selectedRows, nativeEvent);
          onSelect(record, selected);
        },
        onSelectAll: (selected, currentSelectedRows, changeRows) => {
          rowSelection?.onSelectAll?.(selected, currentSelectedRows, changeRows);
          onSelectAll(selected, currentSelectedRows, changeRows);
        }
      }
    : //如果没有传入rowSelection，只要mainOption或者batchMode模式下 存在就会默认给一个rowSelection
      (mainOption || batchMode) && {
        onSelect: onSelect,
        onSelectAll: onSelectAll,
        selectedRowKeys:
          selectedRows &&
          selectedRows.map((i) => {
            const key = typeof rowKey === 'function' ? rowKey(i) : rowKey;
            return i[key];
          })
      };

  return (
    <div className={className} style={{ background: 'white', ...style }}>
      {!!title && (
        <Header
          selectedRows={selectedRows}
          title={title}
          batchMode={batchMode}
          setBatchMode={(batchMode) => {
            if (!batchMode) {
              setSelectedRows([]);
            }
            setBatchMode(batchMode);
            onBatchOptionChange?.(batchMode);
          }}
          batchOptionSelected={batchOptionSelected}
          setBatchOptionSelected={setBatchOptionSelected}
          batchOption={batchOption}
          mainOption={mainOption}
          searchProps={
            !disableSearch && !tableProps?.disableSearch
              ? handleSearch
                ? {
                    ...searchProps,
                    onSearch: handleSearch,
                    defaultValue: queryData?.search
                  }
                : searchProps
              : undefined
          }
          //@ts-ignore
          rangePickerProps={_rangePickerProps}
          columns={filterColumns}
          setEnableColumns={setEnableColumns}
          prefixCls={defaultPrefixCls}
        />
      )}

      <AntTable
        className={classnames(defaultPrefixCls, isFixed && 'fixed-table', prefixCls)}
        prefixCls={prefixCls}
        dataSource={dataSource}
        columns={sortColumns(
          simpleColumns.concat(
            filterColumns.filter((i) => enableColumns.indexOf(i.dataIndex) > -1),
            optionsColumnsWrap
          ),
          columns
        )}
        pagination={{
          ...defaultPagination,
          ...tablePaginationProps,
          ...pagination
        }}
        // pagination={{ ...pagination }}
        rowSelection={!!title ? batchMode && rowSelectionWrap : rowSelectionWrap}
        rowKey={rowKey}
        {...restTableProps}
        {...restProps}
      ></AntTable>
    </div>
  );
};

export default Table;
