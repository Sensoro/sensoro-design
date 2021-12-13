export interface OptionsItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface RenderDelegate {}

export interface OptionsRenderProps {
  className?: string;
  style?: React.CSSProperties;
  shrinkIndex?: number;
  autoHide?: boolean;
  hoverStyle?: boolean;
  options?: OptionsItem[];
  onClick?: (key: string) => void;
}

export interface OptionsProps extends OptionsRenderProps {
  type?: 'link' | 'button';
  shrinkIndex?: number;
  autoHide?: boolean;
}

export interface OptionItem {
  title?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}
