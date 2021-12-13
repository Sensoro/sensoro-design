import React, { FC, CSSProperties, useState, useEffect } from 'react';
import classNames from '@pansy/classnames';
import Icon from '../../icon';

export interface PrismPlayProps {
  prefixCls?: string;
  className?: string;
  status?: boolean;
  style?: CSSProperties;
  onChange?: (status?: boolean) => void;
}

const PrismPlay: FC<PrismPlayProps> = (props) => {
  const { prefixCls, className, onChange, style, status } = props;
  const [isPlay, setIsPlay] = useState<boolean>(false);

  useEffect(() => {
    setIsPlay(status);
  }, [props.status]);

  const handleChange = () => {
    setIsPlay(!isPlay);
    onChange?.(!isPlay);
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <Icon onClick={handleChange} type={`icon-${isPlay ? 'pause' : 'caret'}`} />
    </div>
  );
};

PrismPlay.defaultProps = {
  prefixCls: 'sen-player-prism-play'
};

export default PrismPlay;
