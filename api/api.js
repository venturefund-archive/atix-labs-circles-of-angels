/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import axios from 'axios';

require('dotenv').config()

// const config = new Conf();
// console.log(config)
// const actualEnvironment = "develop";

// config.set("develop", {
//   baseURL: "http://localhost:3001",
//   timeout: 1000
// });

const frontendURL = process.env.FRONTEND_URL | 'http://localhost:3001';

const api = axios.create({
  baseURL: frontendURL,
  timeout: 60000,
  headers: { 'content-type': 'application/json' },
  credentials: 'same-origin',
  withCredentials: true
});

export default api;
