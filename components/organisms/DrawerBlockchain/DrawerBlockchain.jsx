import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import ItemBlockchain from '../../atoms/ItemBlockchain/ItemBlockchain';
import './_style.scss';
import ToggleDrawer from './ToggleDrawer';
import { blockchainInfoPropTypes } from '../../../helpers/proptypes';

const DrawerBlockchain = ({ title, data }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  return (
    <div>
      <ToggleDrawer onClick={showDrawer} />
      <Drawer
        placement="right"
        closable={false}
        onClose={closeDrawer}
        visible={isDrawerVisible}
        className="DrawerBlockchain"
        width="350"
      >
        <div>
          <img
            className="TitleImage"
            src="/static/images/blockchain.svg"
            alt="blockchain"
          />
          <h1>{title}</h1>
          <div className="BlockContainer">
            {data &&
              data.map(({ image, label, link, info }) => (
                <ItemBlockchain
                  image={image}
                  label={label}
                  link={link}
                  info={info}
                />
              ))}
          </div>
        </div>
        <img src="/static/images/rsk.svg" alt="certified" />
      </Drawer>
    </div>
  );
};

DrawerBlockchain.defaultProps = {
  title: undefined,
  data: []
};

DrawerBlockchain.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  data: PropTypes.arrayOf(PropTypes.shape(blockchainInfoPropTypes))
};

export default DrawerBlockchain;
