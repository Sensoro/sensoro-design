import React, { FC } from 'react';
import { Divider } from 'antd';
import { LineBoard } from '@sensoro/sensoro-design';
import { Slider } from 'antd';
const { connect, Point, useLineRender } = LineBoard;

const Example: FC = () => {
  const { renderLine, destroyLine, renderLineOptimized, postRenderLine } = useLineRender();

  return (
    <div style={{ position: 'relative', height: 600 }}>
      <Slider
        min={0}
        max={100}
        onChange={(progress) => {
          // console.log("progress = ", progress);
          // renderLineOptimized(
          //   { id: "E", point: { x: 375, y: 441 } },
          //   { id: "F", point: { x: 675, y: 751 } },
          //   {
          //     lineType: "path",
          //     getWayPoints: () => [{ x: 475, y: 751 }],
          //   },
          //   progress / 100
          // );
          postRenderLine(
            'G',
            'H',
            [
              { x: 375, y: 441 },
              { x: 475, y: 751 },
              { x: 675, y: 751 }
            ],
            {
              lineType: 'path'
            },
            progress / 100
          );
        }}
      />
      {
        <Point
          id={'A'}
          placement={'bottom'}
          style={{
            width: 100,
            height: 30,
            lineHeight: '30px',
            textAlign: 'center',
            background: 'red',
            color: 'white',
            left: '100px',
            top: '300px'
          }}
          onMouseEnter={() => {
            renderLineOptimized(
              'A',
              { id: 'F', point: { x: 475, y: 741 } },
              {
                lineType: 'path'
              },
              1
            );
          }}
          onMouseLeave={() => {
            destroyLine('A', 'F');
          }}
        >
          A(375,441)
        </Point>
      }
      <Point
        id={'B'}
        placement={'left'}
        style={{
          position: 'absolute',
          width: 100,
          height: 30,
          lineHeight: '30px',
          textAlign: 'center',
          background: 'red',
          color: 'white',
          left: '300px',
          top: '300px'
        }}
        onMouseEnter={() => {
          renderLine('B', 'C');
        }}
        onMouseLeave={() => {
          destroyLine('B', 'C');
        }}
      >
        B(675，741)
      </Point>

      <Point
        id={'C'}
        placement={'left'}
        style={{
          position: 'absolute',
          width: 100,
          height: 30,
          lineHeight: '30px',
          textAlign: 'center',
          background: 'red',
          color: 'white',
          left: '100px',
          top: '300px'
        }}
      >
        x: 475, y: 647
      </Point>
    </div>
  );
};

export default connect()(Example);
