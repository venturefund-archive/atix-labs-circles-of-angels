import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Navbar from 'components/atoms/Navbar/Navbar';
import SideBar from 'components/organisms/SideBar/SideBar';
import './back-office-layout.scss';
import classNames from 'classnames';

const BackOfficeLayout = ({ children, user, project }) => (
  <Layout className="backOfficeLayout">
    <Navbar project={project} isProtectedRoute />
    <Layout className="mainContent">
      {user?.isAdmin && <SideBar hasDaos={user && user.hasDaos} role={user && user.role} />}
      <div
        className={classNames('mainContent__content', {
          '--withSidebar': user?.isAdmin
        })}
      >
        {children}
      </div>
    </Layout>
  </Layout>
);

BackOfficeLayout.defaultProps = {
  user: undefined
};

BackOfficeLayout.propTypes = {
  user: PropTypes.shape({}),
  children: PropTypes.element.isRequired
};

export default BackOfficeLayout;
