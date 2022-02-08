import React, { useState } from 'react';
import { Form, Button, Divider, Radio, Switch } from 'antd';
import { Schedule } from '@sensoro/sensoro-design';
import { Unit } from '../interface';

const defaultValueMap = {
  millisecond: [{ start: 230 * 60 * 1000, end: 450 * 60 * 1000 }],
  second: [{ start: 230 * 60, end: 450 * 60 }],
  minute: [{ start: 230, end: 450 }],
  text: [{ start: 350, end: 730 }],
  time: [{ start: '03:50', end: '07:30' }]
};

const units: Unit[] = ['millisecond', 'second', 'minute', 'text', 'time'];

export default () => {
  const [form] = Form.useForm();
  const [unit, setUnit] = React.useState<Unit>(units[4]);
  const [autoMerge, setAutoMerge] = React.useState<boolean>(false);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log(values.timeRule);
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleInit = () => {
    const value = defaultValueMap[unit];

    form.setFieldsValue({
      timeRule: value
    });
  };

  const handleUnitChange = (e) => {
    const value = e.target.value;
    setUnit(value);
    form.resetFields();
  };

  return (
    <div>
      <Form layout="inline">
        <Form.Item label="单位">
          <Radio.Group onChange={handleUnitChange} value={unit}>
            {units.map((item) => (
              <Radio.Button key={item} value={item}>
                {item}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="是否自动合并">
          <Switch
            checked={autoMerge}
            onChange={() => {
              setAutoMerge(!autoMerge);
            }}
          />
        </Form.Item>
      </Form>

      <Divider dashed />

      <Form form={form} layout="vertical">
        <Form.Item label="提醒时间" name="timeRule">
          <Schedule.Slider unit={unit} style={{ width: 568 }} autoMerge={autoMerge} />
        </Form.Item>
      </Form>

      <Divider dashed />

      <Button onClick={handleSubmit}>获取数据</Button>
      <Button style={{ margin: '0 8px' }} onClick={handleReset}>
        重置数据
      </Button>
      <Button onClick={handleInit}>设置数据</Button>
    </div>
  );
};
