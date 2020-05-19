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
import Header from '../../components/molecules/Header/Header';
import SideBar from '../../components/organisms/SideBar/SideBar';
import CardDao from '../../components/molecules/CardDao/CardDao';
import CustomButton from '../../components/atoms/CustomButton/CustomButton';
import { getDaos } from '../../api/daoApi';

function Dao() {
  const [visibility, setVisibility] = useState(false);
  const [daos, setDaos] = useState([]);
  const history = useHistory();

  const fetchDaos = async () => {
    try {
      console.log('esto se llama?');
      const response = await getDaos();
      console.log('ACA ', response);
      setDaos(response);
    } catch (error) {
      message.error(error);
    }
  };

  // TODO for the moment cards without redirection
  // const goToProjectDetail = project => {
  //   const state = { projectId: project.id };
  //   history.push(`/project-detail?id=${project.id}`, state);
  // };

  useEffect(() => {
    fetchDaos();
  }, []);

  return (
    <div className="AppContainer">
      <SideBar />
      <div className="MainContent">
        <Header />
        <div className="DaoContainer">
          <div className="flex space-between titleSection">
            <div className="column">
              <p className="LabelSteps">
                <LeftOutlined /> Back
              </p>
              <TitlePage textTitle="Listar Daos" />
            </div>
            <CustomButton theme="Primary" buttonText="+ Create new DAO" />
          </div>
          <div className="BoxContainer">
            {/* {daos.map(dao => (
            <CardDao project={project} />
          ))} */}
            <CardDao />
            <CardDao />
            <CardDao />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dao;

/*


          <h3 className="StepDescription">
            Transfer your pledged funds, help the world become a better place
            for everyone
          </h3>
          <p className="LabelSteps">Project Name</p>
          <h1>Lorem Ipsum</h1>
          <div className="TransferContent">
            <h2>Circles of Angels Bank Account Information</h2>
            <div className="TransferBankInfo">
              <h3>Singapore Bank</h3>
              <h4> Account #: 0012345678</h4>
              <h4> Account owner: CirclesOfAngels</h4>
            </div>
          </div>
          <div className="ControlSteps">
            <CustomButton theme="Cancel" buttonText="Cancel" />
          </div>

*/
