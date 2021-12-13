import React, { forwardRef, useContext } from 'react';
import classNames from '@pansy/classnames';
import { Tag as AntTag } from 'antd';
import CheckableTag from 'antd/es/tag/CheckableTag';
import { generate } from '@ant-design/colors';
import { ConfigContext } from '../config-provider';
import { TagProps as AntTagProps } from 'antd/es/tag';
import List from './list';

export interface TagProps extends AntTagProps {
  multicolor?: boolean;
}

export interface TagType
  extends React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLElement>> {
  CheckableTag: typeof CheckableTag;
  List: typeof List;
}

const InternalTag: React.ForwardRefRenderFunction<HTMLSpanElement, TagProps> = (
  { className, multicolor, style, ...rest },
  ref
) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('tag');
  const tagStyle = {
    ...style
  };

  if (multicolor && rest?.color) {
    const colors = generate(rest?.color);
    tagStyle.color = colors[5];
    tagStyle.background = colors[0];
    tagStyle.borderColor = colors[2];
  }

  return (
    <AntTag
      {...rest}
      style={tagStyle}
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`${prefixCls}-multicolor`]: multicolor
      })}
      ref={ref}
    />
  );
};

const Tag = forwardRef<HTMLSpanElement, TagProps>(InternalTag) as TagType;

Tag.displayName = 'SenTag';
Tag.defaultProps = {
  multicolor: false
};

Tag.List = List;
Tag.CheckableTag = CheckableTag;

export default Tag;
