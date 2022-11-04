/* eslint-disable prefer-destructuring */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import { message } from 'antd';
import axios from 'axios';
import formatError from '../helpers/errorFormatter';

export const getBaseURL = () => process.env.NEXT_PUBLIC_URL_HOST;

const baseURL = getBaseURL();

const api = axios.create({
  baseURL,
  timeout: 60000,
  headers: { 'content-type': 'application/json' },
  credentials: 'same-origin',
  withCredentials: true
});
const loadingMessage = message;
let requestsInQueue = 0;

/*
api.interceptors.request.use(
  config => {
    if (requestsInQueue === 0) {
      loadingMessage.loading('Loading...', 0);
    }
    requestsInQueue++;

    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => {
    requestsInQueue--;
    if (requestsInQueue === 0) {
      loadingMessage.destroy();
    }
    return Promise.resolve(response);
  },
  error => Promise.reject(error)
);
*/
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

export const doGet = async (url, data, config) => makeApiRequest('get', url, data, config);

export const doPost = async (url, data = {}, config) => makeApiRequest('post', url, data, config);

export const doPut = async (url, data = {}, config) => makeApiRequest('put', url, data, config);

export const doDelete = async url => makeApiRequest('delete', url);

export default api;
