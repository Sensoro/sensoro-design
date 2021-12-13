import React from 'react';
import { Viewer } from '@sensoro/sensoro-design';

const { ImageViewer } = Viewer;
const images = [
  {
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584945152600&di=8205d9722c8a62176520030a75d6b0ab&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D8390d138923df8dca63d8f99fd1072bf%2F0b61f6246b600c33741b0107174c510fd8f9a1a6.jpg'
  },
  {
    url:
      'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1584931799&di=6f1559d8862a26b3cb987f9fed1033ff&src=http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg'
  },
  {
    url:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584953505517&di=a6b7519a1c39c50fd425944011f98182&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F19928%2F19927799_0800.jpg'
  }
];

const Example: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
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

export default Example;
