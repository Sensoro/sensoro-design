import React, { useState, useEffect, useContext, useRef } from 'react';
import classNames from '@pansy/classnames';
import { useSize } from '@pansy/react-hooks';
import { CloseOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { PreviewImageProps } from './types';
import { ConfigContext } from '../config-provider';
import Image from '../image';

const PreviewImage: React.FC<PreviewImageProps> = ({
  visible,
  className,
  startIndex = 0,
  images = [],
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>();
  const rootRef = useRef<HTMLDivElement>(null);
  const { getPrefixCls } = useContext(ConfigContext);
  const { height = 640 } = useSize(rootRef) ?? {};

  useEffect(() => {
    if (visible) {
      setCurrentIndex(startIndex);
      return;
    }

    setCurrentIndex(undefined);
  }, [visible, startIndex]);

  const prefixCls = getPrefixCls('preview-image');

  const imageInfo = images[currentIndex];

  const handleRightClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (currentIndex === images.length - 1) {
      return;
    }
    setCurrentIndex((prev) => {
      return prev + 1 < images.length ? prev + 1 : 0;
    });
  };

  const handleLeftClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((prev) => {
      return prev - 1 < 0 ? images.length - 1 : prev - 1;
    });
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      width={height - 64}
      style={{
        top: 88,
        padding: 0
      }}
      modalRender={() => {
        return (
          <div ref={rootRef} className={classNames(className, prefixCls)}>
            <div className={`${prefixCls}-container`}>
              {images.length > 1 && (
                <>
                  <div
                    className={classNames(`${prefixCls}-operation`, {
                      [`${prefixCls}-operation-left`]: true,
                      [`${prefixCls}-operation-disabled`]: currentIndex === 0
                    })}
                    onClick={handleLeftClick}
                  >
                    <LeftOutlined />
                  </div>
                  <div
                    className={classNames(`${prefixCls}-operation`, {
                      [`${prefixCls}-operation-right`]: true,
                      [`${prefixCls}-operation-disabled`]: currentIndex === images.length - 1
                    })}
                    onClick={handleRightClick}
                  >
                    <RightOutlined />
                  </div>
                </>
              )}
              <div className={`${prefixCls}-content`}>
                <div className={`${prefixCls}-header`}>
                  查看图片
                  <div className={`${prefixCls}-close`}>
                    <CloseOutlined onClick={handleClose} />
                  </div>
                </div>
                <div className={`${prefixCls}-body`}>
                  {imageInfo?.url && <Image fit="contain" src={imageInfo.url} />}

                  {images.length > 1 && (
                    <div className={`${prefixCls}-pagination`}>
                      {`${currentIndex + 1} / ${images.length}`}
                    </div>
                  )}
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
