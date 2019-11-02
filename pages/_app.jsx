/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import App, { Container } from 'next/app';
import withReactRouter from './with-react-router';
import 'antd/dist/antd.css';
import '../css/app.scss';
import { UserProvider } from '../components/utils/UserContext';
import Login from './login';

function MyApp() {
  const Component = Login;
  const props = {};
  return (
    <Container>
      <UserProvider>
        <Component {...props} />
      </UserProvider>
    </Container>
  );
}

export default withReactRouter(MyApp);
