import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import classNames from '@pansy/classnames';

interface TextButtonProps extends ButtonProps {
  hoverStyle?: boolean;
}

const TextButton: React.FC<TextButtonProps> = (props, ref) => {
  const { children, style, prefixCls, hoverStyle, ...rest } = props;
  return (
    <Button
      ref={ref}
      type={'link'}
      className={classNames({
        btn: !!hoverStyle,
        linkBtn: !hoverStyle
      })}
      style={{ ...style }}
      {...rest}
    >
      {children}
    </Button>
  );
};

// export default TextButton;

export default React.forwardRef(TextButton as React.ForwardRefRenderFunction<any, TextButtonProps>);
