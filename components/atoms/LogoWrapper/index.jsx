import React from 'react';
import PropTypes from 'prop-types';
import customConfig from 'custom-config';
import TitlePage from '../TitlePage/TitlePage';
import './_style.scss';

const LogoWrapper = ({ textTitle, image }) => {
  const src = image || customConfig.LOGO_PATH;

  return (
    <div className="LogoWrapper">
      <img src={src} alt={`${customConfig.NAME} logo`} />
      <TitlePage textTitle={textTitle} underlinePosition="none" />
    </div>
  );
};

export default LogoWrapper;

LogoWrapper.defaultProps = {
  textTitle: '',
  image: ''
};

LogoWrapper.propTypes = {
  textTitle: PropTypes.string,
  image: PropTypes.string
};
