import React from 'react';

export interface Point {
  x: number;
  y: number;
}

export interface LineRender {
  renderLine: (start: string, end: string, option?: Option, forceMeasure?: boolean) => void;
  renderLineOptimized: (
    start: RenderPoint | string,
    end: RenderPoint | string,
    option: Option,
    progress: number
  ) => void;
  destroyLine: (start: string, end: string) => void;
  renderLines: (lines: [string, string][], option: Option) => void;
  postRenderLine: (
    startId: string,
    endId: string,
    points: Point[],
    option: Option,
    progress: number
  ) => void;
  destroyLines: (lines: [string, string][]) => void;
}

export interface LineBoardContextValue extends LineRender {
  width?: number;
  height?: number;
  registerPoint: (id: string, point: Point, updateIndex: number) => void;
  unregisterPoint: (id: string) => void;
  getUpdateIndex: (id: string) => number;
}

export type Placement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'center'
  | 'left-top'
  | 'right-top'
  | 'left-bottom'
  | 'right-bottom';

export type LineType = 'default' | 'point';

export interface PointProps<T = any> extends React.HTMLAttributes<T> {
  id: string;
  placement?: Placement;
  context?: LineBoardContextValue;
}

export interface RenderPoint {
  id: string;
  point: Point;
}

export interface Option {
  lineColor?: string;
  lineWidth?: number;
  lineType?: string;
  animation?: boolean;
  getWayPoints?: (start: Point, end: Point) => Point[];
}

export type ConnectOption = (start: string, end: string) => Option;

export interface LineBoardOption {
  maxLine?: number;
  zIndex?: number;
}

export type LineRenderType = 'simple' | 'optimized';
export interface Line {
  type: LineRenderType;
  startId: string;
  endId: string;
  start: Point;
  end: Point;
  option: Option;
  progress?: number;
}

export type LineState<S = Line> = [
  S | undefined,
  React.Dispatch<React.SetStateAction<S | undefined>>
];

export type UseLinesResult<S = Line> = LineState<S>[];
