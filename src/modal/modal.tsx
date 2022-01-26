import React, { useContext } from 'react';
import classNames from '@pansy/classnames';
import { Modal as AntModal } from 'antd';
import { ConfigContext } from '../config-provider';

import type { ModalProps } from 'antd/es/modal';

export const Modal: React.FC<ModalProps> = (props) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('modal');

  return <AntModal {...props} className={classNames(prefixCls, props.className)} />;
};

Modal.defaultProps = {
  maskClosable: false
};
