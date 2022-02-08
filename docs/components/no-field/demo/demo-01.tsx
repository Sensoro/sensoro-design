import React, { FC } from 'react';
import { Divider } from 'antd';
import { NoField } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <div>
      空字符串： <NoField value="" />
      <Divider dashed />
      数字0： <NoField value={0} />
      <Divider dashed />
      NAN： <NoField value={NaN} />
      <Divider dashed />
      空数组： <NoField value={[]} />
      <Divider dashed />
      对象： <NoField value={{}} />
      <Divider dashed />
      普通字符串： <NoField value="Hello world" />
      <Divider dashed />
      ReactNode数组：
      <NoField>
        {[1, 2, 3].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </NoField>
      <Divider dashed />
    </div>
  );
};

export default Example;
