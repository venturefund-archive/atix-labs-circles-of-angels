import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import ItemBlockchain from '../../atoms/ItemBlockchain/ItemBlockchain';
import { blockchainInfoPropTypes } from '../../../helpers/proptypes';
import {
  buildEvidenceBlockchainData,
  buildOracleBlockchainData
} from '../../../helpers/blockchainData';

const EvidenceBlockchainInfo = ({ onLoad, extraData, noDataMessage }) => {
  const [evidenceData, setEvidenceData] = useState([]);
  const [oracleData, setOracleData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const info = await onLoad();

      if (info) {
        const { oracle: oracleInfo, ...evidenceInfo } = info;
        setEvidenceData(
          buildEvidenceBlockchainData({ ...evidenceInfo, ...extraData })
        );
        setOracleData(buildOracleBlockchainData(oracleInfo));
      } else {
        throw new Error('Missing blockchain data');
      }
    } catch (e) {
      setEvidenceData([]);
      setOracleData([]);
    }
    setLoading(false);
  };

  return (
    <div className="Container">
      {(oracleData && oracleData.length > 0) ||
      (evidenceData && evidenceData.length > 0) ? (
        <>
          <div className="Header">
            <h1>
              What is saved on the <b>Blockchain?</b>
            </h1>
            <img src="/static/images/rsk-small.svg" alt="rsk-logo" />
          </div>
          <Spin spinning={loading}>
            <div className="flex Rows">
              {oracleData &&
                oracleData.map(({ image, label, link, info }) => (
                  <ItemBlockchain
                    image={image}
                    label={label}
                    link={link}
                    info={info}
                  />
                ))}
            </div>
            <div className="flex Rows">
              {evidenceData &&
                evidenceData.map(({ image, label, link, info }) => (
                  <ItemBlockchain
                    image={image}
                    label={label}
                    link={link}
                    info={info}
                  />
                ))}
            </div>
          </Spin>
        </>
      ) : (
        <div className="NoData">
          <h1>{noDataMessage}</h1>
        </div>
      )}
    </div>
  );
};

EvidenceBlockchainInfo.defaultProps = {
  extraData: {},
  noDataMessage: 'The blockchain information could not be fetched'
};

EvidenceBlockchainInfo.propTypes = {
  extraData: PropTypes.shape(blockchainInfoPropTypes),
  noDataMessage: PropTypes.string,
  onLoad: PropTypes.func.isRequired
};

export default EvidenceBlockchainInfo;
