import { ModalProps } from 'antd/es/modal';

export interface ImageProps {
  url: string;
  title?: string;
}

export interface PreviewImageProps extends ModalProps {
  startIndex?: number; //初始属性
  images?: ImageProps[];
  visible: boolean;
  onClose: () => void;
  imageClassName?: string;
  animation?: Animation;
  renderImage?: (index: number) => React.ReactNode;
}
