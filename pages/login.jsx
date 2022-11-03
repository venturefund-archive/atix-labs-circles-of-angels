import { Row } from 'antd';
import Navigation from 'components/organisms/Navigation';
import React, { useState } from 'react';

function Login() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Row
      className="Landing"
      style={{
        backgroundImage: 'url(./static/images/COA-Login-Image-Background.png)',
        backgroundSize: 'cover',
        backgroundPositionX: 'center'
      }}
    >
      <Navigation
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </Row>
  );
}

export default Login;
