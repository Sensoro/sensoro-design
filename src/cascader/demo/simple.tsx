import React, { FC } from 'react';
import { Cascader } from '@sensoro/sensoro-design';

const BasicExample: FC = () => {
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake'
            }
          ]
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men'
            }
          ]
        }
      ]
    }
  ];

  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <div>
      <Cascader options={options} onChange={handleChange} placeholder="Please select" />
    </div>
  );
};

export default BasicExample;
