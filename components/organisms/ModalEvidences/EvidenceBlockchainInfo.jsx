import React from 'react';
import PropTypes from 'prop-types';
import ItemBlockchain from '../../atoms/ItemBlockchain/ItemBlockchain';
import { blockchainInfoPropTypes } from '../../../helpers/proptypes';

const EvidenceBlockchainInfo = ({ oracleInfo, evidenceInfo }) => (
  <div className="Container">
    <div className="Header">
      <h1>
        What is saved on the <b>Blockchain?</b>
      </h1>
      <img src="/static/images/rsk-small.svg" alt="rsk-logo" />
    </div>
    <div className="flex Rows">
      {oracleInfo &&
        oracleInfo.map(({ image, label, link, info }) => (
          <ItemBlockchain image={image} label={label} link={link} info={info} />
        ))}
    </div>
    <div className="flex Rows">
      {evidenceInfo &&
        evidenceInfo.map(({ image, label, link, info }) => (
          <ItemBlockchain image={image} label={label} link={link} info={info} />
        ))}
    </div>
  </div>
);

EvidenceBlockchainInfo.defaultProps = {
  oracleInfo: [],
  evidenceInfo: []
};

EvidenceBlockchainInfo.propTypes = {
  oracleInfo: PropTypes.arrayOf(PropTypes.shape(blockchainInfoPropTypes)),
  evidenceInfo: PropTypes.arrayOf(PropTypes.shape(blockchainInfoPropTypes))
};

export default EvidenceBlockchainInfo;
