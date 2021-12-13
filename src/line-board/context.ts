import React from 'react';
import { LineBoardContextValue } from './types';

export const LineBoardContext = React.createContext<LineBoardContextValue>(
  {} as LineBoardContextValue
);

export const useLineBoardContext = () => React.useContext<LineBoardContextValue>(LineBoardContext);

export const useLineRender = () => {
  const {
    renderLine,
    renderLineOptimized,
    postRenderLine,
    destroyLine,
    renderLines,
    destroyLines
  } = useLineBoardContext();
  return {
    renderLine,
    destroyLine,
    renderLines,
    postRenderLine,
    destroyLines,
    renderLineOptimized
  };
};
