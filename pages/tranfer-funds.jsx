import React from 'react';
import { Skeleton } from 'antd';

import Header from '../components/molecules/Header/Header.jsx';
import SideBar from '../components/organisms/SideBar/SideBar.jsx';
import StepsIf from '../components/molecules/StepsIf/StepsIf.jsx';
import FormTransfer from '../components/molecules/FormTransfer/FormTransfer.jsx';

import './_style.scss';
import './_transfer-funds.scss';

const TransferFunds = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <StepsIf />
      <div className="TransferContainer">
        <h1>Transfer Funds</h1>
        <div className="TransferContent">
          <h2>Circles of Angels Bank Account Information</h2>
          <Skeleton />
          <FormTransfer />
        </div>
      </div>
    </div>
  </div>
);

export default TransferFunds;
