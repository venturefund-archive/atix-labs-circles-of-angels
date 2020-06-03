/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import '../_style.scss';
import './_style.scss';
import { LeftOutlined } from '@ant-design/icons';
import '../_transfer-funds.scss';
import TitlePage from '../../components/atoms/TitlePage/TitlePage';
import ProposalModal from '../../components/molecules/ProposalModal/ProposalModal';
import Daomembers from '../../components/molecules/DaoMembers/Daomembers';

function DaoMembers() {
  return (
    <div className="DaoContainer">
      <div className="flex space-between titleSection borderBottom marginBottom">
        <div className="column daoDetail marginBottom">
          <p className="LabelSteps">
            <LeftOutlined /> Back to proposal
          </p>
          <div className="flex flex-start detailDaoTitleContainer">
            <TitlePage textTitle="Name of the DAO 1" />
            <div className="flex space-between">
              <a>Proposals (2)</a>
              <a>Proposals (36)</a>
            </div>
          </div>
        </div>
        <ProposalModal />
      </div>
      <Daomembers />
    </div>
  );
}

export default DaoMembers;
