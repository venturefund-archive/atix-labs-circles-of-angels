import { Row } from 'antd';
import React from 'react';
import TopBar from '../components/organisms/TopBar/TopBar';

function Login() {
  return (
    <Row
      className="Landing"
      style={{
        backgroundImage: 'url(./static/images/COA-Login-Image-Background.png)',
        backgroundSize: 'cover',
        backgroundPositionX: 'center'
      }}
    >
      <TopBar />
    </Row>
  );
}

export default Login;
