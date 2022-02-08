import React, { FC } from 'react';
import { Palette } from '@sensoro/sensoro-design';

const data = [
  {
    value: '1',
    color: '#F2555F',
    label: '红色',
    style: { marginRight: 24 }
  },
  {
    value: '2',
    color: '#F2944B',
    label: '橙色',
    style: { marginRight: 24 }
  },
  {
    value: '3',
    color: '#FFD469',
    label: '黄色',
    style: { marginRight: 24 }
  },
  {
    value: '4',
    color: 'white',
    colorStyle: {
      border: '1px solid rgba(31,33,38,0.10)'
    },
    style: { marginRight: 24 },
    label: '白色'
  }
];

const BasicExample: FC = () => {
  const [val, setVal] = React.useState(['1', '2']);
  return (
    <div>
      <div>直接传data</div>
      <br />
      <Palette data={data} value={val} multiple={true} onChange={setVal} />
      <br />
      <br />
      <div>使用jsx的方式</div>
      <br />
      <Palette>
        {data.map((i) => (
          <Palette.Item key={i.value} {...i} style={{ marginRight: '24px' }}></Palette.Item>
        ))}
      </Palette>
    </div>
  );
};

export default BasicExample;
