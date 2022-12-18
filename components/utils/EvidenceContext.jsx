/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const EvidenceContext = React.createContext();


export function EvidenceProvider({ children }) {
    const [message, setMessage] = useState('');

    const clearMessage = () => setMessage('');

    return (
      <EvidenceContext.Provider
            value={{
                message,
                clearMessage,
                setMessage,
            }}
      >
        {children}
      </EvidenceContext.Provider>
    );
}

EvidenceProvider.propTypes = {
    children: PropTypes.node.isRequired
};
