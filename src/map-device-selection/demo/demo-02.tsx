import React from 'react';
import { Form, Space, Button } from 'antd';
import { MapDeviceSelection } from '@sensoro/sensoro-design';
import { devices } from './data-source';

const { Item } = Form;

export default () => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
  };

  const handleSetData = () => {
    form.setFieldsValue({
      devices: ['03C80017C73E19AC']
    });
  };

  const handleGetData = () => {
    console.log(form.getFieldValue('devices'));
  };

  return (
    <Form form={form}>
      <Item name="devices" initialValue={['03C80017C71FE458']}>
        <MapDeviceSelection
          style={{ height: 500 }}
          deviceKey="sn"
          list={devices}
          onChange={(value) => {
            console.log(value);
          }}
        />
      </Item>

      <Space>
        <Button onClick={handleReset}>重置</Button>
        <Button onClick={handleSetData}>设置数据</Button>
        <Button onClick={handleGetData}>获取数据</Button>
      </Space>
    </Form>
  );
};
