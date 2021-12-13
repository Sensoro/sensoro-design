import React from 'react';
import { SpinProps } from 'antd/es/spin';

export type CardPlusType = React.FC<CardPlusProps>;
export type CardPlusChildType = React.ReactElement<CardPlusProps, CardPlusType>;

export type ColSpanType = number | string;
export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type Gutter = number | Partial<Record<Breakpoint, number>>;

export type CardPlusProps = {
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式属性
   */
  style?: React.CSSProperties;
  /**
   * 标题样式
   */
  headStyle?: React.CSSProperties;
  /**
   * 内容样式
   */
  bodyStyle?: React.CSSProperties;
  /**
   * 页头是否有分割线
   */
  headerBordered?: boolean;
  /**
   * 卡片标题
   */
  title?: React.ReactNode;
  /**
   * 右上角自定义区域
   */
  extra?: React.ReactNode;
  /**
   * 布局，center 代表垂直居中
   */
  layout?: 'default' | 'center';
  /**
   * 加载中
   */
  loading?: boolean | SpinProps;
  /**
   * 栅格布局宽度，24 栅格，支持指定宽度或百分，需要支持响应式 colSpan={{ xs: 12, sm: 6 }}
   */
  colSpan?: ColSpanType | Partial<Record<Breakpoint, ColSpanType>>;
  /**
   * 栅格间距
   */
  gutter?: Gutter | Gutter[];
  /**
   * 拆分卡片方式
   */
  split?: 'vertical' | 'horizontal';
  /**
   * 是否有边框
   */
  bordered?: boolean;
  /**
   * 是否可折叠
   */
  collapsible?: boolean;
  /**
   * 受控 collapsed 属性
   */
  collapsed?: boolean;
  /**
   * 配置默认是否折叠
   */
  defaultCollapsed?: boolean;
  /**
   * 收起卡片的事件
   */
  onCollapse?: (collapsed: boolean) => void;
};
