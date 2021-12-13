import React from 'react';
import classNames from '@pansy/classnames';
import { Timeline } from 'antd';
import { TimelineItemProps as AntTimeLineItemProps } from 'antd/es/timeline';
import { generate } from '@ant-design/colors';
import './style/item.less';
const prefixCls = 'sen-timeline-item';

export interface TimeLineItemProps extends AntTimeLineItemProps {
  title?: string | React.ReactNode;
  fill?: string;
  border?: boolean;
}

const Item: React.FC<TimeLineItemProps> = (props) => {
  const { className, children, dot, title, color, fill, border, ...rest } = props;
  const dotColor = color || '#D8D8D8';
  const bgColor = fill || (color ? generate(color)[1] : '#F3F3F3');

  const dotStyle = border ? { border: `1px solid ${dotColor}` } : { background: bgColor };
  return (
    <Timeline.Item
      className={classNames(className, prefixCls)}
      dot={
        dot || (
          <div className={'dot'} style={dotStyle}>
            <div className={'center'} style={{ background: dotColor }} />
          </div>
        )
      }
      {...rest}
    >
      <div className={'title'}>{title}</div>
      {children}
    </Timeline.Item>
  );
};

export default Item;
