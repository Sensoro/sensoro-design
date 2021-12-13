import { CSSProperties, MouseEventHandler } from 'react';

export interface TextLinkProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  href?: string;
  disabled?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
  underline?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}
