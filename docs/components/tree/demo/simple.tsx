import React, { FC } from 'react';
import { Tree, Icon } from '@sensoro/sensoro-design';
import PlusOutlined from '@sensoro-design/icons/PlusOutlined';
import CopyOutlined from '@sensoro-design/icons/CopyOutlined';

const treeData = [
  {
    title: '这是一个超长的title，测试超长文本',
    key: '0-0',
    keepMenus: true,
    menus: [
      { label: '新建', icon: <PlusOutlined />, value: 0 },
      { label: '复制', icon: <CopyOutlined />, value: 1 }
    ],
    children: [
      {
        title: '测试subMenu111111111111111111111111',
        key: '0-0-0',
        menus: [
          { label: '新建', icon: <PlusOutlined />, value: 0 },
          {
            label: '复制', //如果不需要tooltip可以注释
            icon: <CopyOutlined />,
            value: 1,
            subMenus: [{ label: '分组', value: 2 }]
          }
        ],
        children: [
          {
            title: 'leaf111111111111111111111111111111111',
            key: '0-0-0-0'
          },
          {
            title: 'leaf',
            key: '0-0-0-1'
          }
        ]
      },
      {
        title: '自定义menu菜单',
        icon: <Icon type={'icon-map-theme-grid'} />,
        key: '0-0-1',
        children: [
          {
            title: <span style={{ color: '#1890ff' }}>sss</span>,
            key: '0-0-1-0'
          }
        ],
        menus: [{ value: 0, component: <div>测试</div> }]
      }
    ]
  },
  {
    title: 'dsjhfsdhfjhsfhskdhfjkshdfjhsdjkfhsdkjfh',
    key: '1-0'
  }
];

const handleMenuClick = (val, data) => {
  console.log('val = ', val);
  console.log('data = ', data);
};

const handleSelect = (selectedKeys) => {
  console.log('selectedKeys = ', selectedKeys);
};

const BasicExample: FC = () => {
  return (
    <div style={{ border: '1px solid #000', width: '240px', padding: '10px' }}>
      <Tree
        showIcon={true}
        treeData={treeData}
        onMenuClick={handleMenuClick}
        defaultExpandedKeys={['0-0']}
        defaultSelectedKeys={['1-0']}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default BasicExample;
