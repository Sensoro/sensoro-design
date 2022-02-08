import React, { FC } from 'react';
import { AreaSelector } from '@sensoro/sensoro-design';
import { Button } from 'antd';

const data = [
  {
    points: [
      { x: 38, y: 675 },
      { x: 26, y: 1033 },
      { x: 526, y: 1045 },
      { x: 514, y: 640 }
    ],
    title: '利星行一号楼南侧'
  },
  {
    points: [
      { x: 1278, y: 219 },
      { x: 883, y: 555 },
      { x: 1708, y: 624 }
    ],
    title: '一个神秘的地方'
  },
  {
    points: [
      { x: 1082, y: 443 },
      { x: 1086, y: 1022 },
      { x: 1839, y: 1041 },
      { x: 1881, y: 513 },
      { x: 1766, y: 262 }
    ],
    title: '艾泽拉斯大陆'
  }
];

const Example: FC = () => {
  const [value] = React.useState<any[]>(data);
  return (
    <div style={{ width: '500px', position: 'relative' }}>
      <div
        style={{
          // display: 'flex',
          // justifyContent: 'space-between',
          // alignItems: 'center',
          // marginTop: 10
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <Button style={{ marginTop: 200 }}>测试</Button>
      </div>
      <AreaSelector
        width={500}
        height={280}
        style={{ border: '1px solid #000000' }}
        editor={false}
        value={value}
      />
    </div>
  );
};

export default Example;
