import React from 'react';

/**
 * 展示模式
 * vertical:垂直; horizontal:水平;
 * */
export type Mode = 'vertical' | 'horizontal';

export interface ScrollableBarRef {
  /**
   * 滚动到初始位置
   */
  reset: () => void;
  /**
   * 滚动到下一页
   */
  next: () => void;
  /**
   * 滚动到上一页
   */
  prev: () => void;
}

export interface ScrollableBarProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /** 是否自动切换 */
  autoplay?: boolean;
  /** 切换的时间间隔 */
  interval?: number;
  // 当前活动的Key
  activeKey?: string;
  // 展示模式 - (垂直/水平)
  mode?: Mode;
  // 是否开启滚动动画
  scrollAnimated?: boolean;
  // 上一个点击回调
  onPrevClick?: (e?) => void;
  // 下一个点击回调
  onNextClick?: (e?) => void;
  // 子项点击回调
  onItemClick?: (key) => void;
  // 上一个Icon图标
  prevIcon?: React.ReactNode;
  /**
   * 点击到尽头，禁用按钮的效果
   */
  endMode?: 'disabled' | 'hidden';
  // 下一个Icon图标
  nextIcon?: React.ReactNode;
  // 方向设置(右向左/左向右)
  direction?: 'rtl' | 'ltr';
}
