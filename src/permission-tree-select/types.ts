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
  type: 1 | 2;
  /** 权限编码 */
  code?: string;
  /** 顺序 */
  showOrder?: number;
  /** 权限父编号 */
  parentId: string;
  /** 树路径 */
  parentIds?: string[];
  /**
   * 子权限
   */
  children?: Permission[];
}

/**
 * 权限数据，id 和 parentId 才能保证权限的唯一性
 */
export interface PermissionValue {
  id: string;
  parentId: string;
}

