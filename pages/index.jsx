import React from 'react';
import Header from '../components/molecules/Header/Header.jsx';
import SideBar from '../components/organisms/SideBar/SideBar.jsx';
import './_style.scss';

const Index = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
    </div>
  </div>
);

export default Index;
