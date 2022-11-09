/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../../atoms/Navbar/Navbar';

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default Layout;

Layout.propTypes = {
    children: PropTypes.node,
}