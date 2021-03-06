import React from 'react';
import LayoutMessage from './layout/LayoutMessage';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <LayoutMessage>A network error has occurred.</LayoutMessage>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
