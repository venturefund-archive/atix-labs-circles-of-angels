import React from 'react';
import PropTypes from 'prop-types';
import SideBar from '../SideBar/SideBar';
import Header from '../../molecules/Header/Header';

const MainLayout = ({ children, withHeader, withSideBar, authenticated }) => (
  <div className="AppContainer">
    {withSideBar && authenticated && <SideBar />}
    <div className="MainContent">
      {withHeader && authenticated && <Header />}
      <div>{children}</div>
    </div>
  </div>
);

MainLayout.defaultProps = {
  withSideBar: true,
  withHeader: true,
  authenticated: false
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  withHeader: PropTypes.bool,
  withSideBar: PropTypes.bool,
  authenticated: PropTypes.bool
};

export default MainLayout;
