import React from 'react';
import { CardPlus } from '@sensoro/sensoro-design';

export default () => {
  return (
    <>
      <CardPlus gutter={[16, 16]}>
        <CardPlus colSpan="300px" title="title" headerBordered>
          300px
        </CardPlus>
        <CardPlus>Auto</CardPlus>
        <CardPlus>Auto</CardPlus>
      </CardPlus>

      <CardPlus gutter={[{ xs: 8, sm: 8, md: 16, lg: 24, xl: 32 }, 16]}>
        <CardPlus>Responsive</CardPlus>
        <CardPlus>Responsive</CardPlus>
        <CardPlus>Responsive</CardPlus>
      </CardPlus>

      <CardPlus gutter={16}>
        <CardPlus>Auto</CardPlus>
        <CardPlus>Auto</CardPlus>
        <CardPlus>Auto</CardPlus>
      </CardPlus>
    </>
  );
};
