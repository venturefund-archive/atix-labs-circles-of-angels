import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import './coa-base-modal.scss';
import classNames from 'classnames';
import customConfig from 'custom-config';

const FOOTER_BUTTONS_POSITION = {
  left: '--footerButtonsLeft',
  center: '--footerButtonsCenter',
  right: '--footerButtonsRight'
};

export const CoaBaseModal = ({
  children,
  className,
  footerButtonPosition,
  withLogo,
  logoImage,
  title,
  description,
  ...rest
}) => {
  const src = logoImage || customConfig.LOGO_PATH;

  return (
    <Modal
      className={classNames('o-coaBaseModal', className, {
        [FOOTER_BUTTONS_POSITION[footerButtonPosition]]: footerButtonPosition
      })}
      closable
      centered
      {...rest}
    >
      <div className="o-coaBaseModal__header">
        <div className="o-coaBaseModal__header__logo">
          {withLogo && <img src={src} alt={`${customConfig.ORGANIZATION_NAME} logo`} />}
        </div>
        {title}
      </div>
      <div className="o-coaBaseModal__body">
        <p className="o-coaBaseModal__body__description">{description}</p>
        {children}
      </div>
    </Modal>
  );
};

CoaBaseModal.defaultProps = {
  children: undefined,
  className: undefined,
  footerButtonPosition: 'right',
  withLogo: undefined,
  logoImage: undefined,
  title: undefined,
  description: undefined
};

CoaBaseModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  footerButtonPosition: PropTypes.string,
  withLogo: PropTypes.bool,
  logoImage: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  description: PropTypes.string
};
