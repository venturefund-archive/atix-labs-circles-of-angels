import React, { Component } from 'react';
import Header from '../components/molecules/Header/Header.jsx';
import SideBar from '../components/organisms/SideBar/SideBar.jsx';
import './App.css';
import './_style.scss';

class App extends Component {
  render() {
    return (
      <div>
      <div className="AppContainer">
      <SideBar />
        <div className="MainContent">
          <Header />
        </div>
      </div>
    </div>
    );
  }
}

export default App;