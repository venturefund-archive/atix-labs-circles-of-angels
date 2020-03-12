/* eslint-disable react/no-danger */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import './_style.scss';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import { downloadFileFromPath } from '../../utils/FileUtils';

const ProjectMission = ({
  mission,
  problem,
  proposal,
  proposalFile,
  agreementFile
}) => (
  <Col className="ProjectMission" span={24}>
    <div className="block">
      <h1 className="title">Our Mission</h1>
      <p>{mission}</p>
    </div>
    <div className="block">
      <h1 className="title">Problem Addressed</h1>
      <p>{problem}</p>
    </div>
    {proposal && (
      <div className="block">
        <h1 className="title">Proposal</h1>
        <div dangerouslySetInnerHTML={{ __html: proposal }} />
      </div>
    )}
    <div className="block">
      <h1 className="title">Attached Files</h1>
      <div>
        {!proposalFile &&
          !agreementFile &&
          'This project does not have any attached files'}
        {proposalFile && (
          <CustomButton
            onClick={() => downloadFileFromPath(proposalFile)}
            buttonText="Project Proposal"
            icon="download"
            classNameIcon="iconDisplay"
          />
        )}
        {agreementFile && (
          <CustomButton
            onClick={() => downloadFileFromPath(agreementFile)}
            buttonText="Legal Agreement"
            icon="download"
            classNameIcon="iconDisplay"
          />
        )}
      </div>
    </div>
  </Col>
);

ProjectMission.defaultProps = {
  proposal: undefined,
  proposalFile: undefined,
  agreementFile: undefined
};

ProjectMission.propTypes = {
  mission: PropTypes.string.isRequired,
  problem: PropTypes.string.isRequired,
  proposal: PropTypes.string,
  proposalFile: PropTypes.string,
  agreementFile: PropTypes.string
};

export default ProjectMission;
