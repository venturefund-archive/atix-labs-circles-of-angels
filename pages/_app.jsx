import React from 'react';
import App, { Container } from 'next/app';
import { UserProvider } from '../components/utils/UserContext';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }


  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserProvider>
        <Container>
          <Component {...pageProps} />
        </Container>
      </UserProvider>
    );
  }
}

export default MyApp;
