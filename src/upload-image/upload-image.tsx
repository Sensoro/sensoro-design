import React, { useState, useEffect, useContext, useRef } from 'react';
import classNames from '@pansy/classnames';
import { Upload, Spin, message } from 'antd';
import { UploadProps, RcFile } from 'antd/es/upload';
import { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import groupBy from 'lodash/groupBy';
import Icon from '../icon';
import { ConfigContext } from '../config-provider';
import Viewer from '../viewer';
import Image from '../image';
import Player from '../player';
import { getSizeTipText, isImageUrl, isVideoUrl, getImgBase64 } from './utils';

export interface UploadImageFile<T = any> extends UploadFile<T> {
  /** 是否是第一次上传的文件 */
  isFirst?: boolean;
  [key: string]: any;
}

export interface UploadChangeParam<T extends object = UploadImageFile> {
  file: T;
  fileList: UploadImageFile[];
  event?: {
    percent: number;
  };
}

export interface UploadImageProps<T = any> extends UploadProps<T> {
  value?: UploadImageFile<T>[];
  // 图片大小限制，(单位: K) -1 表示不进行限制
  sizeLimit?: number;
  // 图片数目限制 -1 表示不进行限制
  lengthLimit?: number;
  // 视频文件大小限制
  videoSizeLimit?: number;
  /** 提示文案 */
  desc?: string;
  /** 上传中的文案 */
  iconRenderText?: string;
  /** 上传按钮的文案 */
  uploadText?: string;
  onChange?: (info: UploadChangeParam) => void;
  onRemove?: (file: UploadImageFile<T>) => void | boolean | Promise<void | boolean>;
}

const { ImageViewer } = Viewer;

const UploadImage: React.FC<UploadImageProps> = (props) => {
  const {
    className,
    sizeLimit,
    lengthLimit,
    desc,
    value = [],
    onChange,
    iconRenderText,
    uploadText,
    videoSizeLimit,
    ...rest
  } = props;
  const lock = useRef<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadProps['fileList']>([]);
  const { getPrefixCls } = useContext(ConfigContext);

  useEffect(() => {
    setFileList(value);
  }, [props.value]);

  const prefixCls = getPrefixCls('upload-image');

  const beforeUpload = (file: RcFile): boolean => {
    // 大小检查结果
    let sizeResult: boolean = true;
    let acceptResult: boolean = true;

    // 检查图片文件大小
    if (sizeLimit !== -1 && isImageUrl(file)) {
      sizeResult = file.size < sizeLimit * 1024;
      if (!sizeResult) {
        message.error(`图片大小不得大于${getSizeTipText(sizeLimit)}`);
      }
    }

    // 检查视频文件大小
    if (sizeLimit !== -1 && isVideoUrl(file)) {
      sizeResult = file.size < sizeLimit * 1024;
      if (!sizeResult) {
        message.error(`视频大小不得大于${getSizeTipText(sizeLimit)}`);
      }
    }

    // 检查文件格式
    acceptResult = checkFileType(file.type, props.accept);

    if (!acceptResult) {
      message.error(`文件格式不正确`);
    }

    return sizeResult && acceptResult;
  };

  const checkFileType = (type: string, accept: string) => {
    const fileType = type.split('/')[1];
    if (!accept || !fileType) return true;

    const types = accept.split(',');

    for (let i = 0; i < types.length; i++) {
      if (types[i].indexOf('/') !== -1) {
        if (fileType === types[i].split('/')[1]) {
          return true;
        }
      }

      if (types[i].startsWith('.')) {
        if (`.${fileType}` === types[i]) {
          return true;
        }
      }
    }

    return false;
  };

  const getFileList = async (list: UploadProps['fileList']) => {
    const result = groupBy(list, (item) => {
      if (!item.url && !item.preview) {
        return 'base64';
      } else {
        return 'normal';
      }
    });

    const imgs = await Promise.all(
      (result.base64 || []).map(async (item) => {
        if (!item.url && !item.preview && isImageUrl(item)) {
          item.preview = (await getImgBase64(item.originFileObj as File)) as string;
        }
        return item;
      })
    );

    return [...(result.normal || []), ...imgs];
  };

  const handleChange = ({ file, fileList }: UploadChangeParam) => {
    if (!file.status) return;

    // 过滤检查未通过的文件
    let newFileList = [...fileList].filter(
      (item) => !item.originFileObj || (item.originFileObj && item.status)
    );

    if (!lock.current && file.status === 'done') {
      file.isFirst = true;
      lock.current = true;
    }

    if (file.status === 'done') {
      const { data } = file.response;
      newFileList = fileList?.map((item: any) => {
        if (item.uid === file.uid) {
          return {
            ...item,
            url: data?.origin || data?.imgUrl,
            extraData: data
          };
        } else {
          return item;
        }
      });
    }

    // 弹出错误信息
    if (file.status === 'error') {
      const { response } = file;

      if (response && response.code !== 0) {
        message.error(response.message);
      }
    }

    const list = newFileList;
    setFileList(list);
    onChange?.({ file, fileList: list });
  };

  const renderChildren = () => {
    if (lengthLimit === -1 || fileList?.length < lengthLimit) {
      return (
        <div className={`${prefixCls}-button`}>
          <PlusOutlined />
          <div className={`${prefixCls}-text`}>{uploadText}</div>
        </div>
      );
    }

    return null;
  };

  const resource = fileList
    .map((item) => ({ url: item.url || item.preview }))
    .filter((item) => (item && isImageUrl(item as UploadFile)) || isVideoUrl(item as UploadFile));

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
    >
      <Upload
        listType="picture-card"
        onChange={handleChange}
        onPreview={() => {
          setVisible(true);
        }}
        beforeUpload={beforeUpload}
        iconRender={(file) => {
          if (file.status === 'uploading') {
            return (
              <Spin
                className={`${prefixCls}-loading`}
                indicator={<LoadingOutlined spin />}
                tip={iconRenderText}
              />
            );
          }

          if (isImageUrl(file)) {
            return <img src={file.url || file.preview} />;
          }
          return <Icon type="icon-video" />;
        }}
        {...rest}
        fileList={fileList}
      >
        {renderChildren()}
      </Upload>

      {desc && <div className={`${prefixCls}-desc`}>{desc}</div>}

      <ImageViewer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        images={resource}
        renderImage={(idx: number) => {
          const item = resource[idx];

          if (!item) return null;

          if (isImageUrl(item as UploadFile)) {
            return (
              <div className="sen-image-view-image no-animation">
                <Image fit="contain" src={item.url} />
              </div>
            );
          } else {
            return (
              <div
                className="sen-image-view-image no-animation"
                style={{
                  height: '400px',
                  width: '711px'
                }}
              >
                <Player
                  source={item.url}
                  options={{
                    autoplay: false
                  }}
                />
              </div>
            );
          }
        }}
      />
    </div>
  );
};

UploadImage.defaultProps = {
  accept: '.png,.jpg,.jpeg',
  iconRenderText: '上传中...',
  uploadText: '上传图片',
  sizeLimit: 1024,
  videoSizeLimit: -1,
  lengthLimit: 3
};

export default UploadImage;
