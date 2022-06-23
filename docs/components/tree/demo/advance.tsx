import React, { FC } from 'react';
import { Tree } from '@sensoro/sensoro-design';
import PlusOutlined from '@sensoro-design/icons/PlusOutlined';
import CopyOutlined from '@sensoro-design/icons/CopyOutlined';

const treeData = [
  {
    title: '这是一个超长的title，测试超长文本',
    key: '0-0',
    children: [
      {
        title: '测试subMenu111111111111111111111111',
        key: '0-0-0',
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
        key: '0-0-1',
        children: [
          {
            title: <span style={{ color: '#1890ff' }}>sss</span>,
            key: '0-0-1-0'
          }
        ]
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
  const [selectedNodes, setSelectedNodes] = React.useState<string[]>([]);
  const renderMenu = (node, hoverKey) => {
    const selected = selectedNodes.indexOf(node?.key) > -1;

    if (node.key === hoverKey) {
      return (
        <PlusOutlined
          onClick={() => {
            setSelectedNodes(Array.from(new Set(selectedNodes.concat(node?.key))));
          }}
        />
      );
    } else {
      return selected ? <CopyOutlined style={{ color: 'red' }} /> : null;
    }
  };

  return (
    <div style={{ border: '1px solid #000', width: '240px', padding: '10px' }}>
      <Tree
        treeData={treeData}
        onMenuClick={handleMenuClick}
        defaultExpandedKeys={['0-0']}
        defaultSelectedKeys={['1-0']}
        onSelect={handleSelect}
        renderMenu={renderMenu}
      />
    </div>
  );
};

export default BasicExample;
