/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import 'antd/dist/antd.css';
import 'css/app.scss';
import 'react-image-lightbox/style.css';
import 'react-quill/dist/quill.snow.css';
import { Container } from 'next/app';
import { UserProvider } from '../components/utils/UserContext';
import Router from '../components/organisms/Router/Router';
import withReactRouter from './with-react-router';
import { StorageProvider } from '../components/utils/StorageContext';
import { routesConfig } from '../components/organisms/Router/RouteConfig';

const MyApp = ({ Component, pageProps }) => (
  <UserProvider>
    <StorageProvider>
      {/* <Router {...props} routesConfig={routesConfig} /> */}
      <Component {...pageProps} />
    </StorageProvider>
  </UserProvider>
);

export default MyApp;
