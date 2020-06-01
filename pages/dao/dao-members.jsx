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
import CardMember from '../../components/molecules/CardMember/CardMember';
import '../_transfer-funds.scss';
import TitlePage from '../../components/atoms/TitlePage/TitlePage';
import ProposalModal from '../../components/molecules/ProposalModal/ProposalModal';

function DaoMembers() {
  return (
    <div className="DaoContainer">
      <div className="flex space-between titleSection borderBottom marginBottom">
        <div className="column marginBottom">
          <p className="LabelSteps">
            <LeftOutlined /> Back to proposal
          </p>
          <TitlePage textTitle="Name of the DAO 1" />
        </div>
        <ProposalModal />
      </div>
      <div className="BoxContainer">
        <CardMember />
        <CardMember />
        <CardMember />
        <CardMember />
        <CardMember />
        <CardMember />
        <CardMember />
      </div>
    </div>
  );
}

export default DaoMembers;
