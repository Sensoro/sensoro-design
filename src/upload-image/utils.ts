import { floor } from 'lodash';
import { UploadFile } from 'antd/es/upload/interface';

/**
 * 获取超出文件大小限制的文本
 * @param size
 */
export const getSizeTipText = (size: number) => {
  if (size % 1024 === 0) {
    return `${floor(size / 1024)}M`;
  }
  return `${size}K`;
};

/**
 * 获取图片的Base64值
 * @param url
 */
export function getImgBase64(url: string | File): Promise<string> {
  if (typeof url === 'string') {
    return new Promise(function (resolve) {
      const Img = new Image();
      let dataURL = '';
      Img.src = url;

      Img.onload = function () {
        const canvas = document.createElement('canvas'),
          width = Img.width,
          height = Img.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(Img, 0, 0, width, height);
        dataURL = canvas.toDataURL();
        resolve(dataURL);
      };
    });
  }

  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.readAsDataURL(url);

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * 获取文件名称
 * @param url
 */
export const extname = (url: string = '') => {
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

const isVideoFileType = (type: string): boolean => type.indexOf('video/') === 0;

/**
 * 判断文件是否是视频
 * @param file
 */
export const isVideoUrl = (file: UploadFile): boolean => {
  if (file.type && !file.thumbUrl) {
    return isVideoFileType(file.type);
  }
  const url: string = (file.thumbUrl || file.url) as string;
  const extension = extname(url);
  if (/^data:video\//.test(url) || /(mp4|avi|rmvb|ts)$/i.test(extension)) {
    return true;
  }
  if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  }
  if (extension) {
    // other file types which have extension
    return false;
  }
  return true;
};

export { isImageUrl } from 'antd/es/upload/utils';
