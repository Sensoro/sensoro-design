import React from 'react';
import { debounce } from 'lodash';

export const useMeasure = (
  deps: any[] = []
): {
  rect: ClientRect;
  ref: any;
} => {
  const [rect, setRect] = React.useState<ClientRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  } as any);
  const ref = React.useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, deps);
  return { ref, rect };
};

export const useWindowSize = () => {
  const [state, setState] = React.useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect((): (() => void) | void => {
    const handler = () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const resize = debounce(handler, 100);

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return state;
};

export const useMeasureBatch = (count: number, deps: any[] = []) => {
  const measureResults = [];
  for (let i = 0; i < count; ++i) {
    const [rect, setRect] = React.useState({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0
    });
    const ref = React.useCallback((node) => {
      if (node !== null) {
        setRect(node.getBoundingClientRect());
      }
    }, deps);
    measureResults[i] = {
      rect,
      ref
    };
  }
  return measureResults;
};
