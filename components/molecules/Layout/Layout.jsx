/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './layout.scss';

import Navbar from 'components/atoms/Navbar/Navbar';

const Layout = ({ children, hasBackgroundImage }) => (
  <>
    <Navbar />
    <div className={classNames('layout__content', { layout__background: hasBackgroundImage })}>{children}</div>
  </>
);

export default Layout;

Layout.defaultProps = {
    hasBackgroundImage: false,
}

Layout.propTypes = {
  children: PropTypes.node,
  hasBackgroundImage: PropTypes.bool,
};
