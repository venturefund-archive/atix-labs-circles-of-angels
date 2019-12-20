import React from 'react';

export default App =>
  class AppWithReactRouter extends React.Component {
    render() {
      const isServer = typeof window === 'undefined';
      return !isServer && <App {...this.props} />;
    }
  };
