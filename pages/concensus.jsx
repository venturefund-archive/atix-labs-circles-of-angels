import React from 'react';
import Header from '../components/molecules/Header/Header.jsx';
import SideBar from '../components/organisms/SideBar/SideBar.jsx';
import StepsSe from '../components/molecules/StepsSe/StepsSe.jsx';
import './_style.scss';
import './_concensus.scss';
import SignatoryItem from '../components/molecules/SignatoryItem/SignatoryItem.jsx';

const Concensus = () => (

  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <StepsSe />
      <div className="SignatoriesContainer">
        <h1>Signatories</h1>
        <div className="SignatoryList">
          <SignatoryItem />
          <SignatoryItem />
          <SignatoryItem />
          <SignatoryItem />
        </div>
      </div>
    </div>
  </div>
  
  );
  
  export default Concensus;