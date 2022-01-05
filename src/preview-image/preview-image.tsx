import React, { useContext } from 'react';
import classNames from '@pansy/classnames';
import { CloseOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { PreviewImageProps } from './types';
import { ConfigContext } from '../config-provider';

const PreviewImage: React.FC<PreviewImageProps> = ({ visible, className, onClose }) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('preview-image');

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      width={640}
      style={{
        top: 88,
        padding: 0
      }}
      modalRender={() => {
        return (
          <div className={classNames(className, prefixCls)}>
            <div className={`${prefixCls}-container`}>
              <div className={`${prefixCls}-content`}>
                <div className={`${prefixCls}-header`}>
                  查看图片
                  <div className={`${prefixCls}-close`}>
                    <CloseOutlined onClick={handleClose} />
                  </div>
                </div>
                <div className={`${prefixCls}-body`}>
                  123
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default PreviewImage;
