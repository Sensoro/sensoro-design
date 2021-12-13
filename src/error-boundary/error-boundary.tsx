import React, { isValidElement } from 'react';
import Fallback, { FallbackProps } from './fallback';
import { getComponentStack } from './utils';

export interface ErrorBoundaryProps {
  fallback?: React.ComponentType<FallbackProps>;
  children?: React.ReactNode;
  onError?: (error: Error, componentStack: string) => void;
}

interface ErrorBoundaryState {
  error?: Error;
  info?: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  componentDidCatch(error, info) {
    const { onError } = this.props;

    if (typeof onError === 'function') {
      try {
        onError(error, getComponentStack(info));
      } catch (ignoredError) {}
    }

    this.setState({
      error,
      info
    });
  }

  render() {
    const { fallback, children } = this.props;
    const { error, info } = this.state;

    const FallbackComponent = 'fallback' in this.props ? fallback : Fallback;

    if (error !== null) {
      return <FallbackComponent componentStack={getComponentStack(info)} error={error} />;
    }

    return children;
  }
}

export default ErrorBoundary;
