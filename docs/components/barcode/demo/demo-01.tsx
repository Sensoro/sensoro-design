import React from 'react';
import { Barcode } from '@sensoro/sensoro-design';

export default () => {
  return (
    <div>
      <Barcode value="12345678" displayValue={false} />
    </div>
  );
};
