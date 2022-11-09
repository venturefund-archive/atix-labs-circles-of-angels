import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Drawer, Row, Col } from 'antd'
import Title from 'antd/lib/typography/Title'
import CustomButton from 'components/atoms/CustomButton/CustomButton'
import customConfig from 'custom-config';
import './_style.scss';

const DrawerTitle = () => (
  <div className="DrawerTitle">
    <MenuUnfoldOutlined style={{ color: 'rgb(76, 127, 247)', fontSize: '16px' }} />
    <img width="36px" src={customConfig.LOGO_PATH} alt={`${customConfig.NAME} logo`} />
  </div>
)


const TopBarOptions = ({
  onLoginClick,
}) => (
  <div className="TopBarOptions">
    <CustomButton
      data-testid="adminLoginButton"
      buttonText="Log In"
      theme="Secondary"
      onClick={onLoginClick}
    />
  </div>
)
const TopBarNavigation = ({
  onMenuClick,
  setModalOpen,
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
        <img
          src={customConfig.LOGO_PATH}
          alt={`${customConfig.NAME} logo`}
        />
      </picture>
    </Col>
    <TopBarOptions
      onLoginClick={() => {
        setModalOpen(true)
      }}
    />
  </Row>
);

const Navigation = ({ onLogin, setModalOpen }) => {
  const [drawerOpen, setDrawerOpen] = useState(onLogin);

  return (
    <>
      <TopBarNavigation
        setModalOpen={setModalOpen}
        onMenuClick={() => setDrawerOpen(true)}
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
        <Title
          level={3}
          onClick={() => {
            setDrawerOpen(false)
            setModalOpen(true)
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
      </Drawer>
    </>
  )
}

export default Navigation;

TopBarNavigation.defaultProps = {
  onMenuClick: () => undefined,
  setModalOpen: () => undefined,
}

TopBarNavigation.propTypes = {
  onMenuClick: PropTypes.func,
  setModalOpen: PropTypes.func,
}

TopBarOptions.defaultProps = {
  onLoginClick: () => undefined,
}

TopBarOptions.propTypes = {
  onLoginClick: PropTypes.func
}

Navigation.defaultProps = {
  onLogin: false,
  setModalOpen: () => undefined
};

Navigation.propTypes = {
  onLogin: PropTypes.bool,
  setModalOpen: PropTypes.func
};
