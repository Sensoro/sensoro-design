import React from 'react';

export function getComponentStack(info: React.ErrorInfo) {
  return info ? info.componentStack : '';
}
