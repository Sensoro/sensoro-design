import React from 'react';
import { debounce } from 'lodash';

export interface UseScrollResult {
  ref: any;
  onScroll: () => void;
}

const useScroll = (onEnd = () => {}) => {
  const end = debounce(onEnd, 100, { leading: true });
  const ref: React.MutableRefObject<any> = React.useRef();

  //防止第一次加载的数量比较小，比容器的高度还小
  React.useEffect(() => {
    if (ref.current.scrollHeight === ref.current.clientHeight) {
      if (typeof onEnd === 'function') {
        end();
      }
    }
  });

  const onScroll = () => {
    //这个10是误差值，在浏览器不同的缩放比例下可能会有0.5-1px的误差
    if (ref.current.scrollHeight - ref.current.clientHeight <= ref.current.scrollTop + 10) {
      if (typeof onEnd === 'function') {
        end();
      }
    }
  };

  return { ref, onScroll };
};

export default useScroll;
