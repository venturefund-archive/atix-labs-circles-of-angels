import React, { useState } from 'react';
import { Row, Col } from 'antd';
import customConfig from 'custom-config';
import ModalLogin from '../../components/organisms/ModalLogin/ModalLogin';
import CustomButton from '../../components/atoms/CustomButton/CustomButton';

const RegisterStepsHeader = () => {
  const [visibility, setVisibility] = useState(false);

  return (
    <Row className="TopBar" type="flex" justify="space-between" align="middle">
      <Col className="gutter-row" xs={10} sm={4} lg={4}>
        <img src={customConfig.LARGE_LOGO_PATH} alt={`${customConfig.ORGANIZATION_NAME} logo`} />
      </Col>
      <Col className="gutter-row" xs={12} sm={{ span: 7, offset: 10 }} lg={{ span: 4, offset: 13 }}>
        Already Registered?
        <div className="WrapperModalLogin">
          <CustomButton
            data-testid="loginButton"
            buttonText="Log In"
            theme="Secondary"
            onClick={() => setVisibility(true)}
          />
          <ModalLogin data-testid="modal" setVisibility={setVisibility} visibility={visibility} />
        </div>
      </Col>
    </Row>
  );
};

export default RegisterStepsHeader;
