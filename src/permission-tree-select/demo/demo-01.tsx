import React from 'react';
import { PermissionTreeSelect } from '@sensoro/sensoro-design';
import { Permission } from '@sensoro/sensoro-design/es/permission-tree-select/types';


const permissions: Permission[] = [
  { id: '001', name: '模块1', type: 1, parentId: '0' },
  { id: '001001', name: '页面1', type: 1, parentId: '001' },
  { id: '001002', name: '页面2', type: 1, parentId: '001' },
  { id: '001001001', name: '按钮1', type: 2, parentId: '001001' },
  { id: '002', name: '模块2', type: 1, parentId: '0' },
  { id: '002001', name: '页面2', type: 1, parentId: '002' },
];

export default () => {
  return <PermissionTreeSelect list={permissions} />;
};
