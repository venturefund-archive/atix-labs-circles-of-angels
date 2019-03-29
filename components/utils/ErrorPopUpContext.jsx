import React from 'react';

export const withErrorPopUp = ComponentToWrap => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        visibleErrorPopUp: false
      };
    }

    static async getInitialProps(query) {
      let pageProps = {};
      if (ComponentToWrap.getInitialProps) {
        pageProps = await ComponentToWrap.getInitialProps(query);
      }

      return pageProps;
    }

    showErrorPopUp = () => {
      this.setState({ visibleErrorPopUp: true });
    };

    hideErrorPopUp = () => {
      this.setState({ visibleErrorPopUp: false });
    };

    render() {
      const { visibleErrorPopUp } = this.state;
      return (
        <ComponentToWrap
          {...this.props}
          showErrorPopUp={this.showErrorPopUp}
          hideErrorPopUp={this.hideErrorPopUp}
          visibleErrorPopUp={visibleErrorPopUp}
        />
      );
    }
  };
};