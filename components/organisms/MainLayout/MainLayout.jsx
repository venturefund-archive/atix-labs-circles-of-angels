import React from 'react';
import PropTypes from 'prop-types';
import SideBar from '../SideBar/SideBar';
import Header from '../../molecules/Header/Header';
import './main-layout.scss';

const MainLayout = ({ children, user, withHeader, withSideBar, authenticated }) => (
  <div className="AppContainer">
    {withSideBar && authenticated && (
      <SideBar hasDaos={user && user.hasDaos} role={user && user.role} />
    )}
    <div className="MainContent">
      {withHeader && authenticated && <Header />}
      <div className="mainContent__content">{children}</div>
    </div>
  </div>
);

MainLayout.defaultProps = {
  user: undefined,
  withSideBar: true,
  withHeader: true,
  authenticated: false
};

MainLayout.propTypes = {
  user: PropTypes.shape({}),
  children: PropTypes.element.isRequired,
  withHeader: PropTypes.bool,
  withSideBar: PropTypes.bool,
  authenticated: PropTypes.bool
};

export default MainLayout;
