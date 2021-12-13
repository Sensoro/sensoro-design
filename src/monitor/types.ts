export interface VideoInfo {
  // 开始时间
  from: number;
  // 视频时长
  duration: number;
  // m3u8文件路径
  objectSignUrl: string;
}

export interface SetMealInfo {
  value: number;
  isEventRecord: boolean;
}
