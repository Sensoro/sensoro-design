import React, { useState } from 'react';
import { PreviewImage } from '@sensoro/sensoro-design';

const images = [
  {
    url:
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
  }
];

export default () => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div>
      {images.map((i, idx) => (
        <img
          key={idx}
          src={i.url}
          style={{
            width: '84px',
            height: '84px',
            cursor: 'pointer',
            marginRight: '8px'
          }}
          onClick={() => {
            setIndex(idx);
            setVisible(true);
          }}
        />
      ))}

      <PreviewImage
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        images={images}
        startIndex={index}
      />
    </div>
  );
};
