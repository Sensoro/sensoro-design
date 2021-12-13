import React, { MouseEvent, ReactNode } from 'react';
import classNames from '@pansy/classnames';
import { Tooltip, Button } from 'antd';
import { AbstractTooltipProps } from 'antd/es/tooltip';
import { NativeButtonProps } from 'antd/es/button/button';
import LocaleReceiver from 'antd/es/locale-provider/LocaleReceiver';
import defaultLocale from 'antd/es/locale/default';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/es/config-provider';

export interface PopmodalProps extends AbstractTooltipProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  onConfirm?: (e?: MouseEvent<HTMLElement>) => void;
  onCancel?: (e?: MouseEvent<HTMLElement>) => void;
  okText?: ReactNode;
  cancelText?: React.ReactNode;
  okButtonProps?: NativeButtonProps;
  cancelButtonProps?: NativeButtonProps;
  content?: ReactNode;
  footerBorder?: boolean;
  onVisibleChange?: (visible: boolean, e?: MouseEvent<HTMLElement>) => void;
}

export interface PopmodalState {
  visible?: boolean;
}

export interface PopconfirmLocale {
  okText: string;
  cancelText: string;
}

class Popmodal extends React.Component<PopmodalProps, PopmodalState> {
  static defaultProps = {
    transitionName: 'zoom-big',
    placement: 'top' as PopmodalProps['placement'],
    trigger: 'click' as PopmodalProps['trigger'],
    disabled: false,
    footerBorder: false
  };

  static getDerivedStateFromProps(nextProps: PopmodalProps) {
    if ('visible' in nextProps) {
      return { visible: nextProps.visible };
    }
    if ('defaultVisible' in nextProps) {
      return { visible: nextProps.defaultVisible };
    }
    return null;
  }

  private tooltip: any;

  constructor(props: PopmodalProps) {
    super(props);

    this.state = {
      visible: props.visible
    };
  }

  getPopupDomNode() {
    return this.tooltip.getPopupDomNode();
  }

  onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setVisible(false, e);

    const { onConfirm } = this.props;
    if (onConfirm) {
      onConfirm.call(this, e);
    }
  };

  onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setVisible(false, e);

    const { onCancel } = this.props;
    if (onCancel) {
      onCancel.call(this, e);
    }
  };

  onVisibleChange = (visible: boolean) => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    this.setVisible(visible);
  };

  setVisible(visible: boolean, e?: React.MouseEvent<HTMLButtonElement>) {
    const { props } = this;
    if (!('visible' in props)) {
      this.setState({ visible });
    }

    const { onVisibleChange } = props;
    if (onVisibleChange) {
      onVisibleChange(visible, e);
    }
  }

  saveTooltip = (node: any) => {
    this.tooltip = node;
  };

  renderOverlay = (popconfirmLocale: PopconfirmLocale) => {
    const {
      className,
      okButtonProps,
      cancelButtonProps,
      cancelText,
      okText,
      content,
      footerBorder
    } = this.props;
    const prefixCls = 'sen-popmodal';

    return (
      <div
        className={classNames(className, {
          [`${prefixCls}`]: true
        })}
      >
        <div
          className={classNames(`${prefixCls}-body`, {
            [`hidden-footer-border`]: !footerBorder
          })}
        >
          {content}
        </div>
        <div
          className={classNames(`${prefixCls}-footer`, {
            [`show-border`]: footerBorder
          })}
        >
          <div>
            <Button onClick={this.onCancel} type="link" {...cancelButtonProps}>
              {cancelText || popconfirmLocale.cancelText}
            </Button>
            <Button onClick={this.onConfirm} type="link" {...okButtonProps}>
              {okText || popconfirmLocale.okText}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  renderConfirm = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, placement, ...restProps } = this.props;
    const prefixCls = getPrefixCls('popover', customizePrefixCls);

    const overlay = (
      <LocaleReceiver componentName="Popconfirm" defaultLocale={defaultLocale.Popconfirm}>
        {(popconfirmLocale: PopconfirmLocale) => this.renderOverlay(popconfirmLocale)}
      </LocaleReceiver>
    );

    return (
      <Tooltip
        {...restProps}
        prefixCls={prefixCls}
        placement={placement}
        onVisibleChange={this.onVisibleChange}
        visible={this.state.visible}
        overlay={overlay}
        ref={this.saveTooltip}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderConfirm}</ConfigConsumer>;
  }
}

export default Popmodal;
