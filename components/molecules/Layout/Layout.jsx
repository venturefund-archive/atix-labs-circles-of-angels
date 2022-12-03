/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import './layout.scss';

import Navbar from 'components/atoms/Navbar/Navbar';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="layout__content">{children}</div>
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node
};
