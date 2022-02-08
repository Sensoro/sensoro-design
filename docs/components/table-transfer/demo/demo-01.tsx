import React, { useEffect } from 'react';
import { Button, Divider, Tag, Form } from 'antd';
import { TableTransfer, Table } from '@sensoro/sensoro-design';

const mockTags = ['cat', 'dog', 'bird'];

const mockData = [];
for (let i = 0; i < 10; i++) {
  mockData.push({
    id: `table_${i}`,
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    tag: mockTags[i % 3]
  });
}

const tableColumns = [
  {
    dataIndex: 'title',
    title: 'Name'
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
    render: (tag) => <Tag>{tag}</Tag>
  },
  {
    dataIndex: 'description',
    title: 'Description'
  }
];

export default () => {
  const table = Table.useTable(mockData.length);
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(table.queryData);
  }, [table.queryData]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
  };

  const handleSetValue = () => {
    form.setFieldsValue({
      inspectionIds: ['table_2']
    });
  };

  return (
    <Form form={form}>
      <Form.Item
        name="inspectionIds"
        label="巡检内容"
        rules={[{ required: true, message: '巡检内容不能为空' }]}
      >
        <TableTransfer
          dataSource={mockData}
          showSearch
          tableProps={{
            table
          }}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          titles={['可选巡检点', '已选巡检点']}
          leftColumns={tableColumns}
          rightColumns={tableColumns}
          locale={{
            searchPlaceholder: '输入巡检点名称/编号'
          }}
        />
      </Form.Item>

      <Divider dashed />

      <Button onClick={handleSubmit}>获取数据</Button>

      <Button style={{ marginLeft: 8 }} onClick={handleSetValue}>
        设置数据
      </Button>
    </Form>
  );
};
