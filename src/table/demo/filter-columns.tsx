import React from 'react';
import { Table } from '@sensoro/sensoro-design';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

const Example: React.FC = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      filterColumn: true,
      defaultFilter: true
    },
    {
      title: '真实的标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <span color={color} key={tag}>
                {tag.toUpperCase()}
              </span>
            );
          })}
        </span>
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: '在线', value: 1 },
        { text: '离线', value: 0 }
      ],
      filtered: true,
      filteredValue: [1],
      filterColumn: true
    },
    {
      title: '操作',
      key: 'options',
      dataIndex: 'options',
      option: true,
      render: () => (
        <>
          <a
            onClick={() => {
              console.log('编辑---->>>');
            }}
          >
            编辑
          </a>
          <a
            onClick={() => {
              console.log('删除---->>>');
            }}
          >
            删除
          </a>
          <a
            onClick={() => {
              console.log('详情---->>>');
            }}
          >
            详情
          </a>
        </>
      )
    }
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    },
    {
      key: '11',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '22',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '33',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    },
    {
      key: '111',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '222',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '333',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    },
    {
      key: '1111',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2222',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3333',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ];

  const handleBatchOptionClick = (key, op, selectedRows) => {
    console.log('key = ', key);
    console.log('op = ', op);
    console.log('selectedRows = ', selectedRows);
  };

  const handleMainOptionClick = (key) => {
    console.log('key = ', key);
  };

  return (
    <ConfigProvider locale={zhCN}>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          title={'测试表格'}
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => {
              console.log('selectedRowKeys ---->>', selectedRowKeys);
              console.log('selectedRows ---->>', selectedRows);
            }
          }}
          searchProps={{
            placeholder: '请输入关键字',
            onSearch: (value) => {
              console.log(value);
            }
          }}
        ></Table>
      </div>
    </ConfigProvider>
  );
};

export default Example;
