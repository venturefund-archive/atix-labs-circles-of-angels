/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import '../_style.scss';
import './_style.scss';
import '../_transfer-funds.scss';
import TitlePage from '../../components/atoms/TitlePage/TitlePage';
import { getDaos } from '../../api/daoApi';
import CardDao from '../../components/molecules/CardDao/CardDao';

function Dao() {
  const [visibility, setVisibility] = useState(false);
  const [daos, setDaos] = useState([]);
  const history = useHistory();

  const fetchDaos = async () => {
    try {
      const response = await getDaos();
      if (response.errors || !response.data) {
        message.error('An error occurred while getting the Daos');
        return [];
      }
      console.log(response.data);
      setDaos(response.data);
    } catch (error) {
      message.error(error);
    }
  };

  const goToDaoDetail = dao => {
    const state = { daoId: dao.id, daoName: dao.name };
    history.push(`/dao-detail?id=${dao.id}`, state);
  };

  useEffect(() => {
    fetchDaos();
  }, []);

  return (
    <div className="DaoContainer">
      <div className="flex space-between titleSection marginBottom">
        <div className="column">
          <TitlePage textTitle="DAOs" />
        </div>
      </div>
      <div className="BoxContainer">
        {daos.map(dao => (
          <CardDao dao={dao} onClick={() => goToDaoDetail(dao)} />
        ))}
      </div>
    </div>
  );
}

export default Dao;
