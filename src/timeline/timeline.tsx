import React from 'react';
import classNames from '@pansy/classnames';
import { Timeline as AntTimeline } from 'antd';
import Item from './item';
import { TimelineProps as AntTimelineProps } from 'antd/es/timeline';
import { excludeChildrenFragment } from '../_utils/condition-component';
import './style/index.less';
const prefixCls = 'sen-timeline';

interface TimelineProps extends AntTimelineProps {
  title?: string | React.ReactNode;
}

export default class Timeline extends React.Component<TimelineProps, {}> {
  static Item = Item;
  render() {
    const { className, title, children, ...rest } = this.props;
    return (
      <AntTimeline className={classNames(className, prefixCls)} {...rest}>
        {title && <Item dot={title}></Item>}
        {/* 如果不去掉fragment的话最后一个节点会多出一条线 */}
        {excludeChildrenFragment(children)}
      </AntTimeline>
    );
  }
}
