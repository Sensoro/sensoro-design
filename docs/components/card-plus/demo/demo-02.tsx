import React from 'react';
import { CardPlus } from '@sensoro/sensoro-design';

export default () => {
  return (
    <>
      <CardPlus layout="center">colSpan - 24</CardPlus>
      <CardPlus colSpan={12} layout="center" style={{ marginTop: 8 }}>
        colSpan - 12
      </CardPlus>
      <CardPlus colSpan={8} layout="center" style={{ marginTop: 8 }}>
        colSpan - 8
      </CardPlus>
      <CardPlus style={{ marginTop: 8 }} gutter={8}>
        <CardPlus colSpan={12} layout="center">
          colSpan-12
        </CardPlus>
        <CardPlus colSpan={6} layout="center">
          colSpan-6
        </CardPlus>
        <CardPlus colSpan={6} layout="center">
          colSpan-6
        </CardPlus>
      </CardPlus>
      <CardPlus style={{ marginTop: 8 }} gutter={8}>
        <CardPlus colSpan={8} layout="center">
          colSpan-8
        </CardPlus>
        <CardPlus layout="center">Auto</CardPlus>
        <CardPlus layout="center">Auto</CardPlus>
      </CardPlus>
      <CardPlus style={{ marginTop: 8 }} gutter={8}>
        <CardPlus colSpan="200px" layout="center">
          colSpan - 200px
        </CardPlus>
        <CardPlus layout="center">Auto</CardPlus>
        <CardPlus layout="center">Auto</CardPlus>
      </CardPlus>
      <CardPlus style={{ marginTop: 8 }} gutter={8}>
        <CardPlus>Auto</CardPlus>
        <CardPlus colSpan="30%">colSpan - 30%</CardPlus>
      </CardPlus>
    </>
  );
};
