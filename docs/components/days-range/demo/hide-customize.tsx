import React, { FC } from 'react';
import { isNumber } from 'lodash';
import { DaysRange } from '@sensoro/sensoro-design';

const Example: FC = () => {
  return (
    <div>
      <DaysRange
        showCustomize={false}
        onChange={(data) => {
          console.log(data);
        }}
        formatter={(val) => {
          if (isNumber(val)) {
            return `近${val}天`;
          }
          return undefined;
        }}
      />
    </div>
  );
};

export default Example;
