export type PictureType = 'person' | 'car';
export type PictureSubtype = 'human' | 'motovehicle' | 'nonmotovehicle';

export interface PictureInfo {
  id: string;
  // 人员ID
  personId: string;
  // 车牌号
  plateText: string;
  // 照片类型
  type: PictureType;
  // 具体类型
  subtype: PictureSubtype;
  // 图片地址
  url: string;
  // 抓拍时间
  captureTime: number;
}

export interface PictureMap {
  [key: string]: PictureInfo[];
}

export interface PictureResult {
  // 格式化的时间
  time: string;
  // 人脸图片信息
  persons: PictureInfo[];
  // 机动车图片信息
  cars: PictureInfo[];
  // 与上一个时间段的间隔，单位秒
  interval: number;
  length: number;
  // 宽度
  width: number;
  left: number;
}
