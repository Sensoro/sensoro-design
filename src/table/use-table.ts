import React from 'react';
import { QueryData } from './types';
import { Moment } from 'moment';
import { TableProps, TablePaginationConfig } from 'antd/es/table';
import { PaginationConfig } from 'antd/es/pagination';
import { UseTableResult } from './types';

export function formatQueryDates(dates: [Moment, Moment]) {
  return dates && dates.length > 1
    ? [dates[0].startOf('day').valueOf(), dates[1].endOf('day').valueOf()]
    : [undefined, undefined];
}

function transform(name: string) {
  if (name === 'ascend') {
    return 'asc';
  } else if (name === 'descend') {
    return 'desc';
  } else {
    return null;
  }
}

export function removeNullProps(object: Object = {}) {
  return Object.keys(object).reduce((prev, c) => {
    if (object[c]) {
      prev[c] = object[c];
    }
    return prev;
  }, {});
}

const useTable = (
  total: number,
  tableProps: TableProps<any> = {},
  query: QueryData = { page: 1, size: 10 }
): UseTableResult => {
  const { pagination, ...rest } = tableProps;

  const [queryData, setQueryData] = React.useState<QueryData>(query);
  const handleSearch = (value: string) =>
    setQueryData({
      ...queryData,
      page: 1, //搜索的时候强制回到第一页
      search: value && value.length > 0 ? value : undefined
    });

  const handleRangePicker = (dates: [Moment, Moment]) => {
    const formatDates = formatQueryDates(dates);
    setQueryData(
      removeNullProps({
        ...queryData,
        page: 1, //选时间段的时候强制回到第一页
        startTime: formatDates[0],
        endTime: formatDates[1]
      })
    );
  };

  return {
    tableProps: {
      pagination: {
        total: total,
        showTotal: (total: number) => `共${total}条`,
        current: queryData?.page ?? 1,
        pageSize: queryData?.size ?? 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '50', '100'],
        ...pagination
      },
      onChange: (pagination: TablePaginationConfig, filters, sorter: any, extra: any) => {
        const { current, pageSize } = pagination;
        const formatFilters = Object.keys(filters).reduce((prev, c) => {
          if (!!filters[c]) {
            prev[c] = filters[c].join(',');
          } else {
            prev[c] = filters[c];
          }
          return prev;
        }, {});
        const formatSorter =
          sorter && sorter.field ? { [sorter.field]: transform(sorter.order) } : {};
        setQueryData(
          removeNullProps({
            ...queryData,
            page: current,
            size: pageSize,
            ...formatSorter,
            ...formatFilters
          })
        );
      },
      ...rest
    },
    queryData,
    setQueryData,
    handleSearch,
    handleRangePicker
  };
};

export default useTable;
