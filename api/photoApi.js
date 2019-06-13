/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import api from './api';

const baseURL = '/photos';

const getPhoto = async id => {
  try {
    const response = await api.get(`${baseURL}/${id}`);
    return response;
  } catch (error) {
    return { error };
  }
};

export { getPhoto };
