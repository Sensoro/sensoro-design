import React from 'react';
import { CardPlus } from '@sensoro/sensoro-design';

export default () => {
  return (
    <>
      <CardPlus style={{ marginTop: 8 }} gutter={8}>
        <CardPlus colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }} layout="center">
          Col
        </CardPlus>
        <CardPlus colSpan={{ xs: 20, sm: 16, md: 12, lg: 8, xl: 4 }} layout="center">
          Col
        </CardPlus>
        <CardPlus colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }} layout="center">
          Col
        </CardPlus>
      </CardPlus>
      <CardPlus style={{ marginTop: 8 }} gutter={8}>
        <CardPlus colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }} layout="center">
          Col
        </CardPlus>
        <CardPlus layout="center">Auto</CardPlus>
        <CardPlus layout="center">Auto</CardPlus>
      </CardPlus>
      <CardPlus style={{ marginTop: 8 }} gutter={8}>
        <CardPlus
          colSpan={{
            xs: '50px',
            sm: '100px',
            md: '200px',
            lg: '300px',
            xl: '400px'
          }}
          layout="center"
        >
          Col
        </CardPlus>
        <CardPlus layout="center">Auto</CardPlus>
        <CardPlus layout="center">Auto</CardPlus>
      </CardPlus>

      <CardPlus style={{ marginTop: 8 }} gutter={8}>
        <CardPlus layout="center">Auto</CardPlus>
        <CardPlus
          layout="center"
          colSpan={{
            xs: '10%',
            sm: '20%',
            md: '30%',
            lg: '40%',
            xl: '50%'
          }}
        >
          Col - 百分比
        </CardPlus>
      </CardPlus>
    </>
  );
};
