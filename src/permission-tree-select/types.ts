/**
 * 权限类型
 * 1: 模块 2: 页面 3: 按钮
 */
export type PermissionType = 1 | 2 | 3;

/**
 * 权限数据
 */
export interface Permission {
  /** 权限唯一编号 */
  id: string;
  /** 权限名称 */
  name: string;
  /**
   * 权限类型
   * 1-页面 2-功能
   */
  type: PermissionType;
  /** 权限编码 */
  code?: string;
  /** 顺序 */
  showOrder?: number;
  /** 权限父编号 */
  parentId: string;
  /** 树路径 */
  parentIds?: string[];
  /** 子权限 */
  children?: Permission[];

  /** 树组件使用 */
  key?: string;
}

/**
 * 权限数据，id 和 parentId 才能保证权限的唯一性
 */
export interface PermissionValue {
  id: string;
  parentId: string;
}
