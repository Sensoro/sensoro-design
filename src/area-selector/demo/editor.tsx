import React, { FC } from 'react';
import { AreaSelector } from '@sensoro/sensoro-design';
import { Button } from 'antd';

const buttonText = ['绘制区域', '取消绘制', '重新绘制'];

const Example: FC = () => {
  const [editor, setEditor] = React.useState(false);
  const [value, setValue] = React.useState<any[]>([]);
  const [buttonState, setButtonState] = React.useState<0 | 1 | 2>(0);
  return (
    <div style={{ width: '500px' }}>
      <AreaSelector
        width={500}
        height={280}
        style={{ border: '1px solid #000000' }}
        editor={editor}
        disablePolygon={true}
        textAline={'center'}
        value={
          value &&
          value.map((i) => ({
            ...i,
            title: 'test',
            labelStyle: { textStyle: 'red' }
          }))
        }
        onChange={(val) => {
          console.log(val);
          setValue(val);
          setButtonState(2);
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10
        }}
      >
        <div style={{ userSelect: 'none' }}>展示全部布控区域</div>
        <Button
          onClick={() => {
            if (buttonState === 0) {
              setEditor(true);
              setButtonState(1);
            } else if (buttonState === 1) {
              setEditor(false);
              setValue([]);
              setButtonState(0);
            } else {
              setEditor(true);
              setButtonState(1);
              setValue([]);
            }
          }}
        >
          {buttonText[buttonState]}
        </Button>
      </div>
    </div>
  );
};

export default Example;
