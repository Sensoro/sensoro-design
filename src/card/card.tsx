import React, { FC, ReactNode } from 'react';
import classNames from '@pansy/classnames';
import isFunction from 'lodash/isFunction';
import { Card as AntCard, Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { CardProps as AntCardProps } from 'antd/es/card';

interface FooterData {
  confirmText?: string;
  confirmButtonProps?: ButtonProps;
  onConfirm?: ButtonProps['onClick'];
  cancelText?: string;
  cancelButtonProps?: ButtonProps;
  onCancel?: ButtonProps['onClick'];
}

export interface CardProps extends AntCardProps {
  headBordered?: boolean;
  footer?: FooterData | ReactNode | false;
}

const prefixCls = 'sen-card';

const Card: FC<CardProps> = (props) => {
  const { className, headBordered, footer, children, ...rest } = props;

  const renderFooter = () => {
    if (!React.isValidElement(footer)) {
      const {
        onCancel,
        onConfirm,
        cancelButtonProps,
        cancelText,
        confirmText,
        confirmButtonProps
      } = footer as FooterData;
      const cancelProps: ButtonProps = {
        ...cancelButtonProps
      };
      const confirmProps: ButtonProps = {
        ...confirmButtonProps
      };

      if (onCancel && isFunction(onCancel)) {
        cancelProps.onClick = onCancel;
      }

      if (onConfirm && isFunction(onConfirm)) {
        confirmProps.onClick = onConfirm;
      }

      return (
        <div className={`${prefixCls}-footer-extra`}>
          <Button {...cancelProps}>{cancelText || '取消'}</Button>
          <Button type="primary" {...confirmProps}>
            {confirmText || '确认'}
          </Button>
        </div>
      );
    }

    return footer;
  };

  return (
    <AntCard
      {...rest}
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`${prefixCls}-hide-head`]: !(
          props.title ||
          props.extra ||
          (props.tabList && props.tabList.length)
        ),
        [`${prefixCls}-head-bordered`]: headBordered
      })}
    >
      <div className={`${prefixCls}-body`}>{children}</div>
      {footer && <div className={`${prefixCls}-footer`}>{renderFooter()}</div>}
    </AntCard>
  );
};

Card.defaultProps = {
  bordered: false,
  headBordered: false
};

export default Card;
