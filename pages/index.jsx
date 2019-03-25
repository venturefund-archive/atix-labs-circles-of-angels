import React from 'react';
import Router from 'next/router';
import { withUser } from '../components/utils/UserContext';
import './_style.scss';

class Index extends React.Component {
  componentDidMount() {
    const nextRoute = (this.props && this.props.user && this.props.user.homeRoute) ? this.props.user.homeRoute : '/login';
    Router.push({
      pathname: nextRoute
    });
  }
  render() {
    return <></>;
  }
}
export default withUser(Index);
