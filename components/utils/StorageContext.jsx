/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import RifStorage, { Provider as EPROVIDER_TYPE } from '@rsksmart/rif-storage';
import { toBuffer } from './FileUtils';

// TODO: save this in config file
const IPFS_HOST = 'localhost';
const IPFS_PORT = '5001';
const IPFS_PROTOCOL = 'http';
const IPFS_URL = 'http://127.0.0.1:8080/ipfs';

// Connects to ipfs node
const storage = RifStorage(EPROVIDER_TYPE.IPFS, {
  host: IPFS_HOST,
  port: IPFS_PORT,
  protocol: IPFS_PROTOCOL
});

// TODO: these functions may need to be improved

const saveFile = async file => {
  const fileHash = await storage.put(await toBuffer(file));
  return fileHash; // this is what should be saved in db
};

const getFileBuffer = fileHash => storage.get(fileHash);

const getFileUrl = fileHash => `${IPFS_URL}/${fileHash}`;

const context = {
  saveFile,
  getFileBuffer,
  getFileUrl
};

export const StorageContext = React.createContext(context);

export const StorageProvider = ({ children }) => (
  <StorageContext.Provider value={context}>{children}</StorageContext.Provider>
);

StorageProvider.propTypes = {
  children: PropTypes.element.isRequired
};
