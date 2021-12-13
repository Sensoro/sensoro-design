import React from 'react';
import { Barcode } from '../barcode';

export default () => {
  return (
    <div>
      <Barcode value="12345678" displayValue={false} />
    </div>
  );
};
