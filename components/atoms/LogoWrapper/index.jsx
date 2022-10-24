import React from 'react';
import PropTypes from 'prop-types';
import TitlePage from '../TitlePage/TitlePage';
import './_style.scss';

const LogoWrapper = ({ textTitle }) => (
  <div className="LogoWrapper">
    <img src="./static/images/isologo.svg" alt="Circles of angels" />
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
