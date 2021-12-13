import React, { FC } from 'react';
import IconItem from './icon-item';

const icons = [
  { type: 'icon-map-theme-grid', name: '实景' },
  { type: 'icon-full-goal', name: '全目标' },
  { type: 'icon-car-outlined', name: '汽车' },
  { type: 'icon-face-camera', name: '人脸摄像机' },
  { type: 'icon-camera', name: '摄像机' },
  { type: 'icon-polygon-selected', name: '多边形选择' },
  { type: 'icon-square-selection', name: '矩形选择' },
  { type: 'icon-round-selection', name: '圆形选择' },
  { type: 'icon-position-filled', name: '定位' },
  { type: 'icon-aim', name: '中心点' },
  { type: 'icon-download', name: '下载' },
  { type: 'icon-empty-image', name: '暂无图片' },
  { type: 'icon-empty-device', name: '暂无设备' },
  { type: 'icon-empty-data', name: '暂无数据' },
  { type: 'icon-search-car', name: '机动车检索' },
  { type: 'icon-search-person', name: '人脸检索' },
  { type: 'icon-design-image', name: '图片' },
  { type: 'icon-pause', name: '暂停' },
  { type: 'icon-caret', name: '播放' },
  { type: 'icon-tick', name: '对勾' },
  { type: 'icon-filter', name: '筛选' },
  { type: 'icon-volume-x', name: '静音' },
  { type: 'icon-volume-1', name: '音量小' },
  { type: 'icon-volume-2', name: '音量大' },
  { type: 'icon-fullscreen', name: '全屏' },
  { type: 'icon-fullscreen-exit', name: '退出全屏' },
  { type: 'icon-offline', name: '离线' },
  { type: 'icon-plus', name: '加' },
  { type: 'icon-more', name: '更多' },
  { type: 'icon-up', name: '上' },
  { type: 'icon-down', name: '下' }
];

const Example: FC = () => {
  return (
    <div>
      {icons.map((item) => (
        <IconItem key={item.type} info={item} />
      ))}
    </div>
  );
};

export default Example;
