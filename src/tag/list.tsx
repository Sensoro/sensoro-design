import React from 'react';
import classNames from '@pansy/classnames';
import { Popover } from 'antd';
import { PopoverProps } from 'antd/es/popover';
import Tag, { TagProps } from './tag';
import FlexTags from './flex-tags';

export interface ItemData {
  text: string;
  icon?: TagProps['icon'];
  color?: TagProps['color'];
}

export interface TagsProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  list?: ItemData[];
  max?: number;
  flexible?: boolean;
  getPopupContainer?: PopoverProps['getPopupContainer'];
}

const Tags: React.FC<TagsProps> = (props) => {
  const { prefixCls, className, style, list = [], max, flexible, getPopupContainer } = props;

  let showList: ItemData[] = [];
  let ishidden: boolean = false;

  if (list.length <= max) {
    showList = list;
    ishidden = false;
  } else {
    showList = list.slice(0, max - 1);
    ishidden = true;
  }

  const renderTags = (item: ItemData, index: number) => {
    const { text, ...rest } = item;
    return (
      <Tag key={index} {...rest}>
        {text}
      </Tag>
    );
  };

  const renderContent = () => {
    return <>{list.map(renderTags)}</>;
  };

  return flexible ? (
    <FlexTags
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
      list={list}
    />
  ) : (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      {showList.map(renderTags)}
      {ishidden && (
        <Popover
          placement="top"
          content={renderContent}
          trigger="hover"
          getPopupContainer={getPopupContainer}
        >
          <Tag>...</Tag>
        </Popover>
      )}
    </div>
  );
};

Tags.defaultProps = {
  prefixCls: 'sen-tag-list',
  list: [],
  max: 3
};

export default Tags;
