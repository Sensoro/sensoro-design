import React from 'react';
import classnames from '@pansy/classnames';
import CloseOutlined from '@sensoro-design/icons/CloseOutlined';
import LeftOutlined from '@sensoro-design/icons/LeftOutlined';
import RightOutlined from '@sensoro-design/icons/RightOutlined';
import { ImageViewerProps, Rect } from './types';
import { createPortal } from 'react-dom';
const prefixCls = 'sen-image-view';

/******************************************
 *根据原始大小计算真正放大后的大小
 * 设计稿
 * 宽度最大值为880px，高度最大值距离上下为72px
 *******************************************/

//image最终的样式
const imageStyleSheet = {
  left: '50%',
  top: '50%',
  width: '880px',
  height: `calc(100% - 144px)`,
  transform: 'translate(-50%, -50%)',
  transitionProperty: 'left,top,width,height',
  // transitionDuration: "0.3s,0.4s,0.4s,0.4s,0.4s",
  // transitionProperty: "all",
  transitionDuration: '0.3s',
  transitionTimingFunction: 'ease'
};

const ImageViewer: React.FC<ImageViewerProps> = (props) => {
  const { startIndex = 0, images = [], visible, onClose, animation, renderImage } = props;
  const initStyles = animation?.initStyles;
  const [index, setIndex] = React.useState(0);
  const [style, setStyle] = React.useState<Rect>();
  const length = images.length;
  const current = images[index];

  React.useEffect(() => {
    if (visible) {
      setIndex(startIndex);
      if (initStyles) {
        setTimeout(() => {
          setStyle(imageStyleSheet);
        }, 0);
      }
    }
  }, [visible, startIndex, initStyles]);

  const handleRightBtnClick = () => {
    setIndex(index + 1 < length ? index + 1 : 0);
  };

  const handleLeftBtnClick = () => {
    setIndex(index - 1 < 0 ? length - 1 : index - 1);
  };

  return (
    (typeof renderImage === 'function' || length > 0) &&
    createPortal(
      <div
        className={classnames({
          [`${prefixCls}`]: true,
          [`${prefixCls}-hide`]: !visible
        })}
      >
        {typeof renderImage === 'function'
          ? renderImage(index)
          : current?.url && (
              <img
                className={classnames({
                  [`${prefixCls}-image`]: true,
                  [`no-animation`]: !initStyles
                })}
                style={
                  !!initStyles
                    ? style || {
                        ...initStyles?.[index],
                        transition: !visible ? 'all .2s ease-in-out' : 'none'
                      }
                    : {}
                }
                src={current?.url}
              />
            )}
        <div
          className={classnames({
            [`${prefixCls}-close`]: true
          })}
          onClick={() => {
            setStyle(null);
            onClose();
          }}
        >
          <CloseOutlined
            className={classnames({
              [`${prefixCls}-btn`]: true
            })}
          />
        </div>
        {length > 1 && (
          <div
            className={classnames({
              [`${prefixCls}-left`]: true
            })}
            onClick={handleLeftBtnClick}
          >
            <LeftOutlined
              className={classnames({
                [`${prefixCls}-btn`]: true
              })}
            />
          </div>
        )}
        {length > 1 && (
          <div
            className={classnames({
              [`${prefixCls}-right`]: true
            })}
            onClick={handleRightBtnClick}
          >
            <RightOutlined
              className={classnames({
                [`${prefixCls}-btn`]: true
              })}
            />
          </div>
        )}

        {current?.url && (
          <div
            className={classnames({
              [`${prefixCls}-title`]: true
            })}
          >{`${index + 1} / ${length} ${current?.title ?? ''}`}</div>
        )}
      </div>,
      document.body
    )
  );
};

export default ImageViewer;
