import React from 'react';
import { Viewer } from '@sensoro/sensoro-design';

const { ImageWall } = Viewer;
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
  return (
    <div>
      <ImageWall images={images} style={{ display: 'flex' }}>
        {(onClick) => (
          <>
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
                onClick={() => onClick(idx)}
              />
            ))}
            <span
              style={{
                width: '84px',
                height: '84px',
                cursor: 'pointer',
                lineHeight: '84px',
                textAlign: 'center',
                background: 'rgba(0, 0, 0, 0.1)',
                display: 'inline-block'
              }}
              onClick={() => onClick(0)}
            >
              全部
            </span>
          </>
        )}
      </ImageWall>

      <br />

      <ImageWall images={images.slice(0, 1)} style={{ display: 'flex' }}>
        {(onClick) => (
          <>
            <img
              src={images[0].url}
              style={{
                width: '84px',
                height: '84px',
                cursor: 'pointer',
                marginRight: '8px'
              }}
              onClick={() => onClick(0)}
            />
          </>
        )}
      </ImageWall>
    </div>
  );
};
