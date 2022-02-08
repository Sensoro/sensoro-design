import React, { memo } from 'react';
import classNames from '@pansy/classnames';
import { weekConfig, MAX_TIME } from '../constant';
import { ConfigContext } from '../../config-provider';
import { WEEK } from '../constant';
import { Time, WeekStatus } from '../interface';

const statusTexts = ['无', '全天', '自定义'];

interface WeekCardProps {
  className?: string;
  isActive?: boolean;
  value: WEEK;
  times?: Time[];
  onClick?: (value: WEEK) => void;
}

const WeekCard: React.FC<WeekCardProps> = ({ className, isActive, value, times, onClick }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('schedule-week-card');
  let status: WeekStatus = 1;

  if (times.length === 0) {
    status = 0;
  } else if (times.length === 1 && times[0].start === 0 && times[0].end === MAX_TIME) {
    status = 1;
  } else {
    status = 2;
  }

  const handleClick = () => {
    onClick && onClick(value);
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`is-active`]: isActive
      })}
      onClick={handleClick}
    >
      <div className={`${prefixCls}-title`}>{weekConfig[value]?.text}</div>
      <div className={`${prefixCls}-description`}>{statusTexts[status]}</div>
    </div>
  );
};

WeekCard.defaultProps = {
  value: WEEK.monday
};

export default memo(WeekCard);
