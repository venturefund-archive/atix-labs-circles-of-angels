import React from 'react';
import { Alert, Col, Row } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './coa-alert.scss';

export const CoaAlert = ({
  highlightedText,
  message,
  Icon,
  className,
  customColor,
  show,
  ...rest
}) =>
  show && (
    <Alert
      className={classNames(
        'coaAlert',
        {
          [`--${customColor}`]: customColor
        },
        className
      )}
      message={
        <Row type="flex" align="middle" className="coaAlert__content" gutter={15}>
          <Col>{Icon}</Col>
          <Col>
            <p>
              <span className="coaAlert__content__highlightedText">{highlightedText}</span>
              <span className="coaAlert__content__message">{message}</span>
            </p>
          </Col>
        </Row>
      }
      closable
      {...rest}
    />
  );

CoaAlert.defaultProps = {
  highlightedText: '',
  message: '',
  Icon: undefined,
  className: '',
  customType: 'warning',
  show: false
};

CoaAlert.propTypes = {
  highlightedText: PropTypes.string,
  message: PropTypes.string,
  Icon: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  customType: PropTypes.string,
  show: PropTypes.bool
};
