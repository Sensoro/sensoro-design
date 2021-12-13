import { SFC } from 'react';
import createFromIconfontCN from '@ant-design/icons/es/components/IconFont';
import { IconBaseProps } from '@ant-design/icons/es/components/Icon';

export interface IconFontProps extends IconBaseProps {
  type: string;
}

const Icon: SFC<IconFontProps> = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1720118_lv0bz31erj.js'
});

export default Icon;
