import React from 'react';
import PropTypes from 'prop-types';

const BlockIcon = ({ url }) => (
  <a href={url}>
    <img src="/static/images/block-blue.svg" alt="block-blue"/>
  </a>
);

export default BlockIcon;

BlockIcon.defaultProps = {
    url: '',
}

BlockIcon.propTypes = {
    url: PropTypes.string,
};
