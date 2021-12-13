export interface ImageProps {
  url: string;
  title?: string;
}

export interface ImageViewerProps {
  startIndex?: number; //初始属性
  images?: ImageProps[];
  visible: boolean;
  onClose: () => void;
  imageClassName?: string;
  animation?: Animation;
  renderImage?: (index: number) => React.ReactNode;
}

export interface Rect {
  width: string | number;
  height: string | number;
  top: string | number;
  left: string | number;
  [key: string]: any;
}

export interface Animation {
  initStyles?: Rect[];
}

export interface ImageWallProps {
  className?: string;
  style?: React.CSSProperties;
  images?: ImageProps[];
  animation?: boolean;
}
