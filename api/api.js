/**
 * COA PUBLIC LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import axios from 'axios';

// const config = new Conf();
// console.log(config)
// const actualEnvironment = "develop";

// config.set("develop", {
//   baseURL: "http://localhost:3001",
//   timeout: 1000
// });

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 60000,
  headers: { 'content-type': 'application/json' },
  credentials: 'same-origin',
  withCredentials: true
});

export default api;
