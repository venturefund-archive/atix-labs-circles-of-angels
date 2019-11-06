import React from 'react';

export default App =>
  class AppWithReactRouter extends React.Component {
    static async getInitialProps(appContext) {
      const {
        ctx: {
          req: { originalUrl, locals = {} }
        }
      } = appContext;

      return {
        originalUrl,
        context: locals.context || {}
      };
    }

    render() {
      const isServer = typeof window === 'undefined';
      return !isServer && <App {...this.props} />;
    }
  };
