import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'components/atoms/Navbar/Navbar';
import { Layout } from 'antd';
import SideBar from '../SideBar/SideBar';
import './main-layout.scss';

const MainLayout = ({ children, user, project }) => (
  <Layout>
    <Navbar project={project} isProtectedRoute />
    <Layout className="mainContent">
      {user?.isAdmin && <SideBar hasDaos={user && user.hasDaos} role={user && user.role} />}
      <div className="mainContent__content">{children}</div>
    </Layout>
  </Layout>
);

MainLayout.defaultProps = {
  user: undefined
};

MainLayout.propTypes = {
  user: PropTypes.shape({}),
  children: PropTypes.element.isRequired
};

export default MainLayout;
