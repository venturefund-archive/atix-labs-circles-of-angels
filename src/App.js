import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/molecules/Header/Header.jsx';
import SideBar from './components/organisms/SideBar/SideBar.jsx';
import Login from './components/pages/Login/Login.jsx';
import Register from './components/pages/Register/Register.jsx';
import './App.css';
import './_style.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="AppContainer">
      <SideBar />
        <div className="MainContent">
          <Header />
          <Switch className="SwitchContainer">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;