/* eslint-disable prefer-destructuring */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import axios from 'axios';
import formatError from '../helpers/errorFormatter';

require('dotenv').config();

// const config = new Conf();
// console.log(config)
// const actualEnvironment = "develop";

// config.set("develop", {
//   baseURL: "http://localhost:3001",
//   timeout: 1000
// });
const { NODE_ENV } = process.env;

export const getBaseURL = () => {
  return 'http://45.79.113.200:3001';
  switch (NODE_ENV) {
    case 'development':
      return 'http://localhost:3001';
    case 'testing': // TODO: don't think this is needed
      return 'http://localhost:3001';
    case 'staging': // TODO: don't think this is needed
      return 'http://localhost:3001';
    case 'production': // when using a production build
      return 'http://localhost:3001';
    default:
      throw new Error('no scope selected');
  }
};

const baseURL = getBaseURL();

const api = axios.create({
  baseURL,
  timeout: 60000,
  headers: { 'content-type': 'application/json' },
  credentials: 'same-origin',
  withCredentials: true
});

export const makeApiRequest = async (method, url, body, config) => {
  let data;
  let headers;
  let errors;

  try {
    const result = await api.request({
      method,
      url,
      data: body,
      ...config
    });

    data = result.data;
    headers = result.headers;
  } catch (error) {
    errors = formatError(error);
  }

  return { data, headers, errors };
};

export const doGet = async (url, data, config) =>
  makeApiRequest('get', url, data, config);

export const doPost = async (url, data = {}, config) =>
  makeApiRequest('post', url, data, config);

export const doPut = async (url, data = {}, config) =>
  makeApiRequest('put', url, data, config);

export const doDelete = async url => makeApiRequest('delete', url);

export default api;
