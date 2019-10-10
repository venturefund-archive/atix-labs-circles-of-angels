/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import api from './api';

const baseURL = 'questionnaire';

const getQuestionnaire = async roleId => {
  try {
    const response = await api.get(`/roles/${roleId}/${baseURL}`);
    return response.data;
  } catch (error) {
    return { error };
  }
};

export { getQuestionnaire };
