import React from 'react';

const App = AppComponent =>
  class AppWithReactRouter extends React.Component {
    render() {
      const isServer = typeof window === 'undefined';
      return !isServer && <AppComponent {...this.props} />;
    }
  };

export default App;
