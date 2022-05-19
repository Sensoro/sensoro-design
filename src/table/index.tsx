import InternalTable from './table';
import useTable from './use-table';
import useBatch from './use-batch';

type InternalTableType = typeof InternalTable;
interface Table extends InternalTableType {
  useTable: typeof useTable;
  useBatch: typeof useBatch;
}
const Table: Table = InternalTable as Table;
Table.useTable = useTable;
Table.useBatch = useBatch;
export default Table;
