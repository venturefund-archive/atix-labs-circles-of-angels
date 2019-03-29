import React from 'react';
import { withUser } from '../components/utils/UserContext';
import './_style.scss';
import Routing from '../components/utils/Routes';

class Index extends React.Component {
  componentDidMount() {
    const { getLoggedUser } = this.props;
    const user = getLoggedUser();
    Routing.toUserHome(user);
  }
  render() {
    return <></>;
  }
}
export default withUser(Index);
