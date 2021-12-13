import React, { FC } from 'react';
import { Tooltip, Button } from '@sensoro/sensoro-design';

const BasicExample: FC = () => {
  return (
    <div>
      <Tooltip type={'multi' as any} title={'温度:25.4°C'}>
        <Button>Default(Top)</Button>
      </Tooltip>
    </div>
  );
};

export default BasicExample;
