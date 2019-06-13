/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

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
