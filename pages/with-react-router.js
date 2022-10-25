import React from 'react';

const App = App =>
  class AppWithReactRouter extends React.Component {
    render() {
      const isServer = typeof window === 'undefined';
      return !isServer && <App {...this.props} />;
    }
  };

export default App;
