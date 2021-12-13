import React, { FC } from 'react';
import { Divider } from 'antd';
import { LineBoard } from '@sensoro/sensoro-design';

const { connect, Point, useLineRender } = LineBoard;

function getWayPoints(start, end) {
  return [{ x: start.x + 200, y: end.y }];
}

const Example: FC = () => {
  const { renderLines, destroyLines } = useLineRender();
  return (
    <div>
      <Point
        id={'A'}
        placement={'bottom'}
        style={{
          width: 30,
          height: 30,
          lineHeight: '30px',
          textAlign: 'center',
          background: 'red',
          color: 'white'
        }}
        onMouseEnter={() => {
          renderLines([['A', 'B']], {
            getWayPoints,
            lineType: 'point',
            animation: true
          });
        }}
        onMouseLeave={() => {
          destroyLines([['A', 'B']]);
        }}
      >
        A
      </Point>
      <Point
        id={'B'}
        placement={'left'}
        style={{
          width: 30,
          height: 30,
          lineHeight: '30px',
          textAlign: 'center',
          background: 'red',
          color: 'white',
          marginLeft: '400px',
          marginTop: '400px'
        }}
      >
        B
      </Point>
    </div>
  );
};

export default connect()(Example);
