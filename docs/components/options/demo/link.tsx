import React from 'react';
import { Options, TextLink } from '@sensoro/sensoro-design';

const ops = [
  {
    label: '编辑',
    value: '1'
  },
  {
    label: '删除',
    value: '2'
  },
  {
    label: '详情',
    value: '3',
    disabled: true
  }
];

const Example: React.FC = (props) => {
  const handleClick = (key) => {
    console.log('click -->', key);
  };

  return (
    <div>
      <div>不使用options参数:</div>
      <Options type={'link'}>
        <Options.Item
          style={{ color: 'red' }}
          // title={"编辑"}
          onClick={() => {
            console.log('编辑---->>>');
          }}
        >
          编辑
          {/* <a
            onClick={() => {
              console.log("编辑---->>>");
            }}
          >
            编辑
          </a> */}
        </Options.Item>
        <Options.Item
          onClick={() => {
            console.log('删除---->>>');
          }}
        >
          删除
        </Options.Item>
        <Options.Item
          disabled={true}
          onClick={() => {
            console.log('详情---->>>');
          }}
        >
          详情
        </Options.Item>
      </Options>
      <div style={{ marginTop: '32px' }}>使用options参数:</div>
      <Options type={'link'} hoverStyle={true} options={ops} onClick={handleClick}></Options>
      <div style={{ marginTop: '32px' }}>单个选项</div>
      <Options type={'link'} options={[ops[0]]} onClick={handleClick}></Options>
      <div style={{ marginTop: '32px' }}>2个选项</div>
      <Options
        type={'link'}
        options={[ops[0], ops[1]]}
        autoHide={true}
        onClick={handleClick}
      ></Options>
    </div>
  );
};

export default Example;
