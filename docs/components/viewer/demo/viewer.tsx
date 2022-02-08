import React, { useState } from 'react';
import { Viewer } from '@sensoro/sensoro-design';

const { ImageViewer } = Viewer;
const images = [
  {
    url:
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
  },
  {
    url:
      'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp'
  },
  {
    url:
      'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
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

      <ImageViewer
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
