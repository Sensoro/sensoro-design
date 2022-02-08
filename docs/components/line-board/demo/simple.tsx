import React, { FC } from 'react';
import { Divider } from 'antd';
import { LineBoard } from '@sensoro/sensoro-design';

const { connect, Point, useLineRender } = LineBoard;

const Example: FC = () => {
  const { renderLine, destroyLine } = useLineRender();
  const [visible, setVisible] = React.useState(true);
  return (
    <div style={{ position: 'relative', height: 600 }}>
      {visible && (
        <Point
          id={'A'}
          placement={'bottom'}
          style={{
            width: 30,
            height: 30,
            lineHeight: '30px',
            textAlign: 'center',
            background: 'red',
            color: 'white',
            left: '100px',
            top: '300px'
          }}
          onMouseEnter={() => {
            renderLine('A', 'B');
          }}
          onMouseLeave={() => {
            destroyLine('A', 'B');
          }}
        >
          A
        </Point>
      )}
      <Point
        id={'B'}
        placement={'left'}
        style={{
          position: 'absolute',
          width: 30,
          height: 30,
          lineHeight: '30px',
          textAlign: 'center',
          background: 'red',
          color: 'white',
          left: '100px',
          top: '300px'
        }}
        onMouseEnter={() => {
          renderLine('B', 'C');
        }}
        onMouseLeave={() => {
          destroyLine('B', 'C');
        }}
      >
        B
      </Point>

      <Point
        id={'C'}
        placement={'left'}
        style={{
          position: 'absolute',
          width: 30,
          height: 30,
          lineHeight: '30px',
          textAlign: 'center',
          background: 'red',
          color: 'white',
          right: '100px',
          top: '100px'
        }}
        onClick={() => {
          setVisible((prev) => !prev);
        }}
      >
        C
      </Point>
    </div>
  );
};

export default connect()(Example);
