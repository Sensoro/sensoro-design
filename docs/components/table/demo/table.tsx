import React from 'react';
import { Table } from '@sensoro/sensoro-design';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

const batchOptions = [
  {
    label: '批量移动',
    value: 'move'
    // type: 'primary'
  },
  {
    label: '批量删除',
    value: 'delete',
    danger: true
  }
];

const mainOptions = [
  {
    label: '添加单位',
    value: '1'
  }
  // {
  //   label: '删除',
  //   value: '2'
  // },
  // {
  //   label: '详情',
  //   value: '3'
  // }
];

const Example: React.FC = () => {
  const [state] = React.useState(true);
  const [state2] = React.useState(true);
  const [state3] = React.useState(true);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
      // key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age'
      // key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      // key: 'address',
      filters: [
        { text: '在线', value: 1 },
        { text: '离线', value: 0 }
      ],
      filtered: true,
      filteredValue: [1]
    },
    {
      title: '真实的标签',
      // key: 'tags',
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
      title: '操作',
      // key: 'options',
      dataIndex: 'options',
      option: true,
      render: () => (
        <>
          {state && (
            <a
              onClick={() => {
                console.log('编辑---->>>');
              }}
            >
              编辑
            </a>
          )}
          {state2 && (
            <a
              onClick={() => {
                console.log('删除---->>>');
              }}
            >
              删除
            </a>
          )}
          {state3 && (
            <a
              onClick={() => {
                console.log('详情---->>>');
              }}
            >
              详情
            </a>
          )}
        </>
      )
    }
  ];

  const data = [
    {
      key: '1',
      name: '',
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

  const [mode, setMode] = React.useState<boolean | string>();

  return (
    <ConfigProvider locale={zhCN}>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          title={'测试表格'}
          searchProps={{
            placeholder: '请输入关键字',
            onSearch: (value) => {
              console.log(value);
            }
          }}
          // batchOption={{
          //   options: batchOptions,
          //   onOptionClick: handleBatchOptionClick
          // }}
          mainOption={{
            options: mainOptions,
            onOptionClick: handleMainOptionClick
          }}
          rowSelection={{
            getCheckboxProps: (record) => ({
              disabled: mode === 'move' && record.age === 32
            }),
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
          }}
          onBatchOptionChange={(mode) => {
            console.log('mode = ', mode);
            setMode(mode);
          }}
        ></Table>
      </div>
    </ConfigProvider>
  );
};

export default Example;
