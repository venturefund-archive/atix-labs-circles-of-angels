/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { message, Input, Icon, Select } from 'antd';
import { LeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import '../_style.scss';
import './_style.scss';
import '../_transfer-funds.scss';
import TitlePage from '../../components/atoms/TitlePage/TitlePage';
import Header from '../../components/molecules/Header/Header';
import SideBar from '../../components/organisms/SideBar/SideBar';
import useQuery from '../../hooks/useQuery';
import { getProposalsByDaoId } from '../../api/daoApi';
import CardDaoDetail from '../../components/molecules/CardDaoDetail/CardDaoDetail';
import CustomButton from '../../components/atoms/CustomButton/CustomButton';
import ProposalModal from '../../components/molecules/ProposalModal/ProposalModal';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function DaoMembers() {
  return (
<div className="DaoContainer">
  hola
  </div>
);
}

export default DaoMembers;
