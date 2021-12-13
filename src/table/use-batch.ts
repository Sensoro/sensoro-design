import React from 'react';
import { OptionItem, UseBatchResult } from './types';

const useBatch = (force: boolean = false): UseBatchResult => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [batchMode, setBatchMode] = React.useState<boolean | string>(force);
  const [batchOptionSelected, setBatchOptionSelected] = React.useState<OptionItem>();
  const exitBatchMode = () => {
    setBatchMode(false);
    setBatchOptionSelected(null);
  };
  return {
    selectedRows,
    setSelectedRows,
    batchMode,
    setBatchMode,
    batchOptionSelected,
    setBatchOptionSelected,
    exitBatchMode
  };
};

export default useBatch;
