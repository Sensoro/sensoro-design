/**
 * 设备使用类型
 * FACE_GRABBER = 1  # 人脸抓拍机
 * FACE_RECOGNITION = 2  # 人脸识别/比对摄像机
 * FULL_TARGET_CAMERA = 3  # 全目标分析、结构化摄像机
 * VEHICLE_GRABBER = 4  # 车辆识别摄像机、车辆微卡口
 * FULL_RECOGNITION = 5  # 态势感知摄像机
 * COMMON_NETWORK = 6  # 普通网络摄像机
 * FIRE_SAFETY_CAMERA = 7  # 安消一体化相机
 * */
export enum DeviceUsageType {
  FACE_GRABBER = 1,
  FACE_RECOGNITION = 2,
  FULL_TARGET_CAMERA = 3,
  VEHICLE_GRABBER = 4,
  FULL_RECOGNITION = 5,
  COMMON_NETWORK = 6,
  FIRE_SAFETY_CAMERA = 7
}

/**
 * 摄像机 icon 配置
 */
export const icons: Record<DeviceUsageType, string> = {
  [DeviceUsageType['FACE_GRABBER']]: 'icon-face_grabber',
  [DeviceUsageType['FACE_RECOGNITION']]: 'icon-camera',
  [DeviceUsageType['FULL_TARGET_CAMERA']]: 'icon-full_target_camera',
  [DeviceUsageType['VEHICLE_GRABBER']]: 'icon-camera',
  [DeviceUsageType['FULL_RECOGNITION']]: 'icon-camera',
  [DeviceUsageType['COMMON_NETWORK']]: 'icon-camera',
  [DeviceUsageType['FIRE_SAFETY_CAMERA']]: 'icon-fire_safety_camera'
};
