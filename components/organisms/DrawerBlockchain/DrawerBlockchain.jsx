import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Spin } from 'antd';
import ItemBlockchain from '../../atoms/ItemBlockchain/ItemBlockchain';
import './_style.scss';
import ToggleDrawer from './ToggleDrawer';
import { buildProjectBlockchainData } from '../../../helpers/blockchainData';

const DrawerBlockchain = ({ title, onLoad, noDataMessage }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [blockchainData, setBlockchainData] = useState([]);
  const [loading, setLoading] = useState(false);

  const showDrawer = async () => {
    setLoading(true);
    setIsDrawerVisible(true);
    try {
      await loadData();
    } catch (e) {
      setBlockchainData([]);
    }
    setLoading(false);
  };
  const closeDrawer = () => setIsDrawerVisible(false);

  const loadData = async () => {
    const info = await onLoad();
    setBlockchainData(buildProjectBlockchainData(info));
  };

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
        {blockchainData && blockchainData.length > 0 ? (
          <div>
            <img
              className="TitleImage"
              src="/static/images/blockchain.svg"
              alt="blockchain"
            />
            <h1>{title}</h1>
            <Spin spinning={loading}>
              <div className="BlockContainer">
                {blockchainData.map(({ image, label, link, info }) => (
                  <ItemBlockchain
                    image={image}
                    label={label}
                    link={link}
                    info={info}
                  />
                ))}
              </div>
            </Spin>
          </div>
        ) : (
          <div className="NoData">
            <h1>{noDataMessage}</h1>
          </div>
        )}
        <img src="/static/images/rsk.svg" alt="certified" />
      </Drawer>
    </div>
  );
};

DrawerBlockchain.defaultProps = {
  title: undefined,
  noDataMessage: 'The blockchain information could not be fetched'
};

DrawerBlockchain.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onLoad: PropTypes.func.isRequired,
  noDataMessage: PropTypes.string
};

export default DrawerBlockchain;
