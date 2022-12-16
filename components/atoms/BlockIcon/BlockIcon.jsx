import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BlockIcon = ({ url }) => (
  <Link to={url}>
    <img src="/static/images/block-blue.svg" alt="block-blue" />
  </Link>
);

export default BlockIcon;

BlockIcon.defaultProps = {
  url: ''
};

BlockIcon.propTypes = {
  url: PropTypes.string
};
