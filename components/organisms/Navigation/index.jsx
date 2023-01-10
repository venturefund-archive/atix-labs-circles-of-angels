import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import customConfig from 'custom-config';
import { MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Drawer, Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import CustomButton from 'components/atoms/CustomButton/CustomButton';

import { UserContext } from '../../utils/UserContext';

import './_style.scss';

const DrawerTitle = () => (
  <div className="DrawerTitle">
    <MenuUnfoldOutlined style={{ color: 'rgb(76, 127, 247)', fontSize: '16px' }} />
    <img width="36px" src={customConfig.LOGO_PATH} alt={`${customConfig.ORGANIZATION_NAME} logo`} />
  </div>
);

const TopBarOptions = ({ onLoginClick, handleLogout, authenticated }) => (
  <div className="TopBarOptions">
    {!authenticated && (
      <CustomButton
        data-testid="adminLoginButton"
        buttonText="Log In"
        theme="Secondary"
        onClick={onLoginClick}
      />
    )}
    {authenticated && (
      <CustomButton
        data-testid="adminLoginButton"
        buttonText="Logout"
        theme="Secondary"
        onClick={handleLogout}
      />
    )}
  </div>
);
const TopBarNavigation = ({
  onMenuClick,
  setModalOpen,
  handleLogout = () => {},
  authenticated = false
}) => (
  <Row className="TopBar" type="flex" justify="space-between" align="middle">
    <Col className="gutter-row">
      <MenuOutlined
        onClick={onMenuClick}
        className="TopBarIcon"
        style={{ fontSize: '16px', color: '#4C7FF7' }}
      />
      <picture>
        <source srcSet={customConfig.LARGE_LOGO_PATH} media="(min-width: 768px)" />
        <img src={customConfig.LOGO_PATH} alt={`${customConfig.ORGANIZATION_NAME} logo`} />
      </picture>
    </Col>
    <TopBarOptions
      onLoginClick={() => {
        setModalOpen(true);
      }}
      handleLogout={handleLogout}
      authenticated={authenticated}
    />
  </Row>
);

function Navigation({ onLogin = false, setModalOpen }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // console.info('UserContext');
  const context = useContext(UserContext);
  const { user, removeUser } = context || {};
  const authenticated = !!user;
  function handleLogout() {
    removeUser();
  }

  useEffect(() => {
    setDrawerOpen(onLogin);
  }, [onLogin]);

  return (
    <>
      <TopBarNavigation
        setModalOpen={setModalOpen}
        onMenuClick={() => setDrawerOpen(true)}
        handleLogout={handleLogout}
        authenticated={authenticated}
      />
      <Drawer
        className="LoginDrawer"
        title={<DrawerTitle />}
        headerStyle={{ border: 'solid 1px red' }}
        visible={drawerOpen}
        placement="left"
        mask={false}
        maskClosable
        onClose={() => setDrawerOpen(false)}
      >
        {!authenticated && (
          <Title
            level={3}
            onClick={() => {
              setDrawerOpen(false);
              setModalOpen(true);
            }}
            style={{
              cursor: 'pointer',
              color: '#4C7FF7',
              fontSize: '20px',
              fontWeight: 'bold'
            }}
          >
            Log In
          </Title>
        )}

        {authenticated && (
          <Title
            level={3}
            onClick={() => {
              handleLogout();
            }}
            style={{
              cursor: 'pointer',
              color: '#4C7FF7',
              fontSize: '20px',
              fontWeight: 'bold'
            }}
          >
            Logout
          </Title>
        )}
      </Drawer>
    </>
  );
}

export default Navigation;

TopBarNavigation.defaultProps = {
  onMenuClick: () => undefined,
  setModalOpen: () => undefined,
  authenticated: false,
  handleLogout: () => undefined
};

TopBarNavigation.propTypes = {
  onMenuClick: PropTypes.func,
  setModalOpen: PropTypes.func,
  authenticated: PropTypes.bool,
  handleLogout: PropTypes.func
};

TopBarOptions.defaultProps = {
  onLoginClick: () => undefined,
  handleLogout: () => undefined,
  authenticated: false
};

TopBarOptions.propTypes = {
  authenticated: PropTypes.bool,
  onLoginClick: PropTypes.func,
  handleLogout: PropTypes.func
};

Navigation.defaultProps = {
  onLogin: false,
  setModalOpen: () => undefined
};

Navigation.propTypes = {
  onLogin: PropTypes.bool,
  setModalOpen: PropTypes.func
};
