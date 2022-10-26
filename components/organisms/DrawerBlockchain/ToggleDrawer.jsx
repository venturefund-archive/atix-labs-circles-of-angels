import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

const ToggleDrawer = ({ onClick }) => (
  <>
    <Tooltip placement="top" title="Blockchain details">
      <div className="ButtonDesktop">
        <button type="button" onClick={onClick}>
          <img
            className="BlockGray"
            src="images/buttondrawer.svg"
            alt="blockchainIcon"
          />
        </button>
      </div>
    </Tooltip>
    <div className="ButtonMobile">
      <button type="button" onClick={onClick}>
        <img
          className="BlockGray"
          src="images/miniblock.svg"
          alt="blockchainIcon"
        />
        Blockchain Details {'>'}
      </button>
    </div>
  </>
);

ToggleDrawer.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ToggleDrawer;
