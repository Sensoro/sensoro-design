import React from 'react';
import { Form, Button, Space } from 'antd';
import { PermissionTreeSelect } from '@sensoro/sensoro-design';
import { Permission } from '@sensoro/sensoro-design/es/permission-tree-select/types';

const permissions: Permission[] = [
  { id: '001', name: '模块1', type: 1, parentId: '0' },
  { id: '001001', name: '页面1', type: 2, parentId: '001' },
  { id: '001002', name: '页面2', type: 2, parentId: '001' },
  { id: '001001001', name: '页面1-1', type: 2, parentId: '001001' },
  { id: '001001001001', name: '按钮1-1-1', type: 3, parentId: '001001001' },
  { id: '001001001002', name: '按钮1-1-2', type: 3, parentId: '001001001' },
  { id: '001001001003', name: '页面1-1-1', type: 2, parentId: '001001001' },
  { id: '001001002', name: '页面1-2', type: 2, parentId: '001001' },
  { id: '001001002001', name: '按钮1-2-1', type: 3, parentId: '001001002' },
  { id: '001001002002', name: '按钮1-2-2', type: 3, parentId: '001001002' },
  { id: '001001003', name: '按钮', type: 3, parentId: '001001' },
  { id: '002', name: '模块2', type: 1, parentId: '0' },
  { id: '002001', name: '页面2', type: 2, parentId: '002' }
];

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item name="permissions">
        <PermissionTreeSelect list={permissions} />
      </Form.Item>
      <Space>
        <Button
          onClick={() => {
            form.validateFields().then((values) => {
              console.log(values);
            });
          }}
        >
          获取数据
        </Button>
        <Button
          onClick={() => {
            form.setFieldsValue({
              permissions: [
                { id: '002001', parentId: '002' },
                { id: '002', parentId: '0' }
              ]
            });
          }}
        >
          设置数据
        </Button>
      </Space>
    </Form>
  );
};
