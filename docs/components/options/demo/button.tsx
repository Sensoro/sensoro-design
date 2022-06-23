import React from 'react';
import { Options, Button, Icon } from '@sensoro/sensoro-design';

const ops = [
  {
    label: '编辑',
    value: '1'
  },
  {
    label: '删除',
    value: '2',
    disabled: true
  },
  {
    label: '详情',
    value: '3'
  }
];

const Example: React.FC = (props) => {
  const handleClick = (key) => {
    console.log('click -->', key);
  };

  return (
    <div>
      <div>不使用options参数:</div>
      <Options type={'button'}>
        <Button
          type="primary"
          icon={<Icon type={'icon-plus'} />}
          onClick={() => {
            console.log('添加人员---->>>');
          }}
        >
          添加人员
        </Button>
        <Options.Item
          disabled={true}
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
      <Options type={'button'} options={ops} onClick={handleClick}></Options>
      <div style={{ marginTop: '32px' }}>单个选项</div>
      <Options type={'button'} options={[ops[0]]} onClick={handleClick}></Options>
      <div style={{ marginTop: '32px' }}>两个选项</div>
      <Options type={'button'} options={ops.slice(0, 2)} onClick={handleClick}></Options>
    </div>
  );
};

export default Example;
