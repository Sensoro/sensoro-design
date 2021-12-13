import { TableProps as AntTableProps, ColumnType as AntColumnType } from 'antd/es/table';
import { SearchProps } from 'antd/es/input/Search';
import { RangePickerProps } from 'antd/es/date-picker';
import { ButtonType } from 'antd/es/button';
import { Moment } from 'moment';
import { TableRowSelection } from 'antd/es/table/interface';

export interface ColumnType<T> extends AntColumnType<T> {
  option?: boolean;
  filterColumn?: boolean;
  defaultFilter?: boolean;
}

export type UseTableResult<T = any> = {
  tableProps: TableProps<T>;
  queryData: QueryData;
  setQueryData: (queryData: QueryData) => void;
  handleSearch: (value: string) => void;
  handleRangePicker: (dates: [Moment, Moment]) => void;
};

export type UseBatchResult<T = any> = {
  selectedRows: T[];
  setSelectedRows: (rows: T[]) => void;
  batchMode: boolean | string;
  setBatchMode: (mode: boolean | string) => void;
  batchOptionSelected: OptionItem;
  setBatchOptionSelected: (selected: OptionItem) => void;
  exitBatchMode: () => void;
};

export interface TableRowSelectionEx<T> extends TableRowSelection<T> {
  onRowSelectionChange?: (selectRows: T[]) => void;
}

export interface TableProps<T>
  extends Omit<AntTableProps<T>, 'columns' | 'title' | 'rowSelection'>,
    Pick<HeaderProps, 'searchProps' | 'batchOption' | 'mainOption' | 'title'> {
  columns?: ColumnType<T>[];
  table?: UseTableResult<T>;
  batch?: UseBatchResult<T>;
  disableSearch?: boolean;
  onBatchOptionChange?: (mode: boolean | string) => void;
  rowSelection?: TableRowSelectionEx<T>;
  rangePickerProps?: true | RangePickerProps;
}

export interface OptionItem {
  label: string;
  value: string;
  danger?: boolean;
  type?: ButtonType;
}

export interface BatchOptionsType {
  options: OptionItem[];
  onOptionClick?: (key: string, op: OptionItem, selectedRows: any[], finish: () => void) => void;
}

export interface MainOptionType {
  options?: OptionItem[];
  onOptionClick?: (key: string) => void;
}

export interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string | React.ReactNode;
  batchMode: boolean | string;
  setBatchMode: (batch: boolean | string) => void;
  batchOptionSelected?: OptionItem;
  setBatchOptionSelected?: (selected: OptionItem) => void;
  batchOption?: BatchOptionsType;
  mainOption?: MainOptionType;
  searchProps?: SearchProps;
  rangePickerProps?: RangePickerProps;
  columns?: ColumnType<any>[];
  selectedRows?: any[];
  setEnableColumns?: (keys: string[]) => void;
  prefixCls: string;
}

export interface QueryData {
  page?: number;
  size?: number;
  search?: string;
  startTime?: number;
  endTime?: number;
  [key: string]: any;
}
