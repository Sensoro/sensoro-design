export interface Point {
  x: number;
  y: number;
}
export interface AABBRect {
  x: number;
  y: number;
  width: number;
  height: number;
  center: Point;
}

export interface ShapeStyle {
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
}

export interface LabelStyle {
  font?: string;
  fillStyle?: string;
  textStyle?: string;
}

export interface Shape {
  points: Point[];
  title?: string;
  style?: ShapeStyle;
  labelStyle?: LabelStyle;
}

export interface Options {
  editor?: boolean;
  value?: Shape[];
  onChange?: (value?: Shape[]) => void;
  minPoint?: number;
  maxPoint?: number;
  width?: number;
  height?: number;
  shapeStyle?: ShapeStyle;
  labelStyle?: LabelStyle;
  editableMaxSize?: number;
  disablePolygon?: boolean;
  textAline?: 'default' | 'center';
  axis?: {
    width: number;
    height: number;
  };
}

export interface AreaSelectorProps extends Options {
  className?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
}
