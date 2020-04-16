import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import './_style.scss';

const ToggleDrawer = ({ onClick }) => (
  <>
    <Tooltip placement="top" title="Blockchain details">
      <div className="ButtonDesktop">
        <button type="button" onClick={onClick}>
          <img
            className="BlockGray"
            src="/static/images/buttondrawer.svg"
            alt="blockchainIcon"
          />
        </button>
      </div>
    </Tooltip>
    <div className="ButtonMobile">
      <button type="button" onClick={onClick}>
        <img
          className="BlockGray"
          src="/static/images/miniblock.svg"
          alt="blockchainIcon"
        />
        Blockchain Details >
      </button>
    </div>
  </>
);

ToggleDrawer.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ToggleDrawer;
