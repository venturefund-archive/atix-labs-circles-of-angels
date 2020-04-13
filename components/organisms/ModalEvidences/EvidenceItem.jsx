import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tag, Icon } from 'antd';
import ItemBlockchain from '../../atoms/ItemBlockchain/ItemBlockchain';
import './_style.scss';

const getApprovedTag = approved =>
  approved ? (
    <Tag color="#4C7FF7">Approved</Tag>
  ) : (
    <Tag color="#DF5BD2">Not Approved</Tag>
  );

const BlockchainInfo = ({ approved }) => (
  <div className="Container">
    <div className="Header">
      <h1>
        What´s saved on the <b>Blockchain ?</b>
      </h1>
      <img src="/static/images/rsk-small.svg" alt="rsk-logo" />
    </div>
    <div className="flex Rows">
      <ItemBlockchain
        image="/static/images/icon-user.svg"
        label="Oracle´s Name"
        info="John Doe"
      />
      <ItemBlockchain
        image="/static/images/icon-date.svg"
        label="Oracle´s Address"
        link="0x8e19747326a8a..."
      />
    </div>
    <div className="flex Rows">
      <ItemBlockchain
        image="/static/images/icon-date.svg"
        label="Date"
        info="14/03/2020"
      />
      <ItemBlockchain
        image="/static/images/icon-block.svg"
        label="Block Number"
        link="69,818"
      />
      <ItemBlockchain
        image="/static/images/icon-transaction.svg"
        label="Transaction Númber"
        link="0x8e19747326a8f0a..."
      />
      <ItemBlockchain
        image="/static/images/icon-link.svg"
        label="IPFS Link"
        link="Imageslink"
      />
      <ItemBlockchain label="Status" link={getApprovedTag(approved)} />
    </div>
  </div>
);

const EvidenceItem = ({ approved, createdAt, description, proof, txLink }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="EvidenceItem">
      <div className="Description">
        <div className="space-between Data">
          <div className="flex Title">
            <h1>Name of the evidence</h1>
            <a
              href="#"
              onClick={() => setIsOpen(!isOpen)}
              className={isOpen ? 'IconOpen' : 'IconClosed'}
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
            </a>
          </div>
          <span>{moment(createdAt).format('MMMM, Do YYYY - HH:mm')}</span>
        </div>
        <p>{description}</p>
      </div>
      <div className="BlockImages">
        <div className="ImageContainer">
          <img src={proof} alt="evidences" />
        </div>
      </div>
      <div className={isOpen ? 'panel-collapse' : 'panel-collapse panel-close'}>
        {/* TODO: get blockchain info from API */}
        {/* <BlockchainInfo approved={approved} /> */}
      </div>
    </div>
  );
};

EvidenceItem.defaultProps = {
  approved: false,
  txLink: undefined
};

EvidenceItem.propTypes = {
  approved: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  proof: PropTypes.string.isRequired,
  txLink: PropTypes.string
};

export default EvidenceItem;
