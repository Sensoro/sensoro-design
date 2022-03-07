import React from 'react';
import { Palette } from '../Palette';
import '../../style';

const colors = [
  {
    name: 'blue',
    text: '拂晓蓝'
  },
  {
    name: 'violet',
    text: '蓝紫色'
  },
  {
    name: 'purple',
    text: '酱紫'
  },
  {
    name: 'red',
    text: '红色'
  },
  {
    name: 'orange',
    text: '橙色'
  },
  {
    name: 'gold',
    text: '黄昏色'
  },
  {
    name: 'yellow',
    text: '黄色'
  },
  {
    name: 'lime',
    text: '亮绿色'
  },
  {
    name: 'green',
    text: '绿色'
  },
  {
    name: 'light-blue',
    text: '亮蓝色'
  }
];

export const Palettes: React.FC = () => {
  return (
    <div className="color-palettes">
      {colors.map((color) => (
        <Palette key={color.name} color={color} showTitle />
      ))}
    </div>
  );
};

export default Palettes;
