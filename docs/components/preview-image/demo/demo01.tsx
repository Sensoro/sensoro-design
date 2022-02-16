import React, { useState } from 'react';
import { Space } from 'antd';
import { useBoolean } from '@pansy/react-hooks';
import { PreviewImage, Image } from '@sensoro/sensoro-design';

const images = [
  {
    url:
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
  }
];

export default () => {
  const [visible, visibleAction] = useBoolean();
  const [index, setIndex] = useState(0);

  return (
    <div>
      <Space>
        {images.map((i, idx) => (
          <Image
            key={idx}
            src={i.url}
            fit="contain"
            style={{
              width: '84px',
              height: '84px',
              cursor: 'pointer'
            }}
            onClick={() => {
              setIndex(idx);
              visibleAction.setTrue();
            }}
          />
        ))}
      </Space>

      <PreviewImage
        visible={visible}
        onClose={() => {
          visibleAction.setFalse();
        }}
        images={images}
        startIndex={index}
      />
    </div>
  );
};
