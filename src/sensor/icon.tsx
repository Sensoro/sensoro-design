import React, { SFC } from 'react';
import createFromIconfontCN from '@ant-design/icons/es/components/IconFont';
import { IconBaseProps } from '@ant-design/icons/es/components/Icon';

interface IconFontProps extends IconBaseProps {
  type: string;
}

const Icon: SFC<IconFontProps> = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1786205_ayba441xkfi.js'
});

interface SensoroIconProps extends IconFontProps {
  text?: string | React.ReactNode;
}

const SensoroIcon: React.FC<SensoroIconProps> = (props) => {
  const { text, type, ...rest } = props;
  return (
    <>
      <Icon type={`icon-${type || 'SMOKE'}`} {...rest} />
      {text}
    </>
  );
};

export default SensoroIcon;
