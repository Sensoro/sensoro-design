import React, { FC } from 'react';
import { Palette } from '@sensoro/sensoro-design';
import { Tooltip, Row, Col } from 'antd';

const data = [
  {
    value: '1',
    color: '#F2555F',
    label: '红色'
  },
  {
    value: '2',
    color: '#F2944B',
    label: '橙色'
  },
  {
    value: '3',
    color: '#FFD469',
    label: '黄色'
  },
  {
    value: '4',
    color: 'white',
    label: '白色'
  }
];

const Plate: FC<any> = (props) => {
  const { color, label } = props;
  return (
    <Tooltip title={label}>
      <div
        style={{
          width: '54px',
          height: '20px',
          position: 'relative',
          border: '1px solid #000',
          background: color,
          marginLeft: 8
        }}
      ></div>
    </Tooltip>
  );
};

const BasicExample: FC = () => {
  return (
    <div>
      <div>自定义样式</div>
      <br />
      <Palette>
        {
          <Row gutter={[2, 4]}>
            {data.map((i) => (
              <Col span={8} key={i.value}>
                <Palette.Item {...i}>
                  <Plate color={i.color} label={i.label} />
                </Palette.Item>
              </Col>
            ))}
          </Row>
        }
      </Palette>
    </div>
  );
};

export default BasicExample;
