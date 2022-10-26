import React from 'react';
import PropTypes from 'prop-types';
import customConfig from 'custom-config';
import TitlePage from '../TitlePage/TitlePage';

const LogoWrapper = ({ textTitle }) => (
  <div className="LogoWrapper">
    <img src={customConfig.LOGO_PATH} alt={`${customConfig.name} logo`} />
    <TitlePage textTitle={textTitle} />
  </div>
);

export default LogoWrapper;

LogoWrapper.defaultProps = {
  textTitle: ''
};

LogoWrapper.propTypes = {
  textTitle: PropTypes.string
};
