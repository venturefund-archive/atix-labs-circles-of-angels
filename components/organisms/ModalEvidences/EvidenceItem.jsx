import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tag } from 'antd';
import './_style.scss';
import EvidenceBlockchainInfo from './EvidenceBlockchainInfo';
import ImageBox from '../../molecules/ImageBox/ImageBox';
import { getEvidenceBlockchainData } from '../../../api/activityApi';

const getApprovedTag = approved =>
  approved ? (
    <Tag color="#4C7FF7">Approved</Tag>
  ) : (
    <Tag color="#DF5BD2">Not Approved</Tag>
  );

const fetchBlockchainData = async evidenceId => {
  const response = await getEvidenceBlockchainData(evidenceId);
  if (response.errors) {
    throw new Error(response.errors);
  }
  return response.data;
};

const EvidenceItem = ({ id, approved, createdAt, description, proof }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="EvidenceItem">
      <div className="Description">
        <div className="space-between Data">
          <div className="flex Title">
            <span>{moment(createdAt).format('MMMM, Do YYYY - HH:mm')}</span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={isOpen ? 'IconOpen' : 'IconClosed'}
              type="button"
            >
              <img
                className="BlockGray"
                src="/static/images/block-gray.svg"
                alt="blockchainicon"
              />
              <img
                className="BlockBlue"
                src="/static/images/block-blue.svg"
                alt="blockchainicon"
              />
            </button>
          </div>
        </div>
        <p>{description}</p>
      </div>
      <div className="BlockImages">
        <div className="ImageContainer">
          <ImageBox imagePath={proof} imageTitle={description} />
        </div>
      </div>
      <div className={isOpen ? 'panel-collapse' : 'panel-collapse panel-close'}>
        <EvidenceBlockchainInfo
          onLoad={() => fetchBlockchainData(id)}
          extraData={{
            status: getApprovedTag(approved)
          }}
          noDataMessage="Could not fetch the blockchain information for this evidence"
        />
      </div>
    </div>
  );
};

EvidenceItem.defaultProps = {
  approved: false
};

EvidenceItem.propTypes = {
  approved: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  proof: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default EvidenceItem;
