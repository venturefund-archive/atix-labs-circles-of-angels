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
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import '../css/app.scss';
import { Container } from 'next/app';
import { UserProvider } from '../components/utils/UserContext';
import Router from '../components/organisms/Router/Router';
import withReactRouter from './with-react-router';
import { StorageProvider } from '../components/utils/StorageContext';
import { routesConfig } from '../components/organisms/Router/RouteConfig';
import { EvidenceProvider } from '../components/utils/EvidenceContext';
import { DictionaryContextProvider } from '../components/utils/DictionaryContext';

const MyApp = props => (
  <Container>
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      useEnterprise
      useRecaptchaNet
      scriptProps={{
        async: false, // optional, default to false,
        defer: false, // optional, default to false
        appendTo: 'head', // optional, default to "head", can be "head" or "body",
        nonce: undefined // optional, default undefined
      }}
      container={{ // optional to render inside custom element
        element: 'reCapchaOwnComponent',
        parameters: {
          badge: 'bottomleft', // optional, default undefined
          theme: 'dark', // optional, default undefined
        }
      }}
    >
      <UserProvider>
        <StorageProvider>
          <DictionaryContextProvider>
            <EvidenceProvider>
              <Router {...props} routesConfig={routesConfig} />
            </EvidenceProvider>
          </DictionaryContextProvider>
        </StorageProvider>
      </UserProvider>
    </GoogleReCaptchaProvider>
    <div id="reCapchaOwnComponent" />
  </Container>
)

export default withReactRouter(MyApp);
