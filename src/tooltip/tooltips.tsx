import React from 'react';
import Tooltip, { AbstractTooltipProps } from 'antd/es/tooltip';
import classNames from '@pansy/classnames';

enum Type {
  single = 'single',
  multi = 'multi'
}

export interface ITooltipProps extends AbstractTooltipProps {
  title?: string | [];
  type?: Type
}

const STooltips: React.FC<ITooltipProps> = (props) => {
  const { title, type, placement, children, prefixCls, className } = props;

  const parsedTitle = Array.isArray(title)
    ? (title.map((item, index) => (<p key={index}>{item}</p>))) : (<span>{title}</span>);

  return (
      <Tooltip
        title={parsedTitle}
        placement={placement}
        className={classNames(className, {
        [`${prefixCls}`]: prefixCls,
        ['sensoro-ui-tooltips']: true
      })}>
        {children}
      </Tooltip>
  );
};


export default STooltips;
