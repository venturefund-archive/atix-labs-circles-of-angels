import classNames from 'classnames';
import React from 'react';
import './_style.scss';
import PropTypes from 'prop-types';

export const CoaCard = ({ className, children }) => (
  <div className={classNames('coaCard', className)}>{children}</div>
);

CoaCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

CoaCard.defaultProps = {
  className: '',
  children: null
};
