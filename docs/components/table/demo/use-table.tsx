import React from 'react';
import { Table } from '@sensoro/sensoro-design';
import moment from 'moment';

const batchOptions = [
  {
    label: '批量移动',
    value: 'move'
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
  },
  {
    label: '删除',
    value: '2'
  },
  {
    label: '详情',
    value: '3'
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

const Example: React.FC = () => {
  const [dataSource, setDataSource] = React.useState([]);

  const table = Table.useTable(
    data.length,
    {},
    {
      page: 2,
      size: 10,
      search: '222',
      startTime: moment().startOf('day').valueOf() - 3600 * 24 * 1000,
      endTime: moment().endOf('day').valueOf()
    }
  );
  const { queryData } = table;
  console.log('queryData = ', queryData);

  React.useEffect(() => {
    const { page, size } = queryData;
    setDataSource(data.slice((page - 1) * size, page * size));
  }, [queryData]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name1'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: true
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ]
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
          {/* <a
            onClick={() => {
              console.log('详情---->>>');
            }}
          >
            详情
          </a> */}
        </>
      )
    }
  ];

  const handleBatchOptionClick = (key, op, selectedRows, finish) => {
    console.log('key = ', key);
    console.log('op = ', op);
    console.log('selectedRows = ', selectedRows);
    finish();
  };

  const handleMainOptionClick = (key) => {
    console.log('key = ', key);
  };

  return (
    <div>
      <Table
        table={table}
        columns={columns}
        dataSource={dataSource}
        // disableSearch={true}
        title={'测试表格'}
        size={'small'}
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            // console.log('selectedRowKeys ---->>', selectedRowKeys);
            // console.log('selectedRows ---->>', selectedRows);
          },
          onRowSelectionChange: (selectRows) => {
            console.log('selectRows = ', selectRows);
          }
        }}
        searchProps={{
          placeholder: '请输入关键字',
          onSearch: (value) => {
            console.log(value);
          }
        }}
        batchOption={{
          options: batchOptions,
          onOptionClick: handleBatchOptionClick
        }}
        mainOption={{
          options: mainOptions,
          onOptionClick: handleMainOptionClick
        }}
        rangePickerProps={true}
      ></Table>
    </div>
  );
};

export default Example;
