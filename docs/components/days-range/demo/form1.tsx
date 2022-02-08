import React, { FC, useEffect } from 'react';
import { Form, Button } from 'antd';
import { DaysRange } from '@sensoro/sensoro-design';

const Example: FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    console.log(vals);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="horizontal">
      <Form.Item name="times" label="时间范围">
        <DaysRange type="radio" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Example;
