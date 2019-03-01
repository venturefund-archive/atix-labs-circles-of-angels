import React from 'react';
import Header from '../components/molecules/Header/Header.jsx';
import SideBar from '../components/organisms/SideBar/SideBar.jsx';
import TableAdmin from '../components/organisms/TableAdmin/TableAdmin.jsx';
import './_style.scss';
import './_fund-administration.scss';

const FundAdministration = () => (

  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <div className="FundAdminContainer">
        <h1>Funds Administration</h1>
        <TableAdmin />
      </div>
    </div>
  </div>
  
  );
  
  export default FundAdministration;