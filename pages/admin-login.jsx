import { Row } from 'antd';
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import ModalLogin from '../components/organisms/ModalLogin/ModalLogin';
import TopBar from '../components/organisms/TopBar/TopBar';

function AdminLogin() {
  const [visibility, setVisibility] = useState(true)
  const AdminModalLogin = (
    <div className="WrapperModalLogin">
      <CustomButton
        data-testid="adminLoginButton"
        buttonText="Log In"
        theme="Secondary"
        onClick={() => setVisibility(true)}
      />
      <ModalLogin
        data-testid="modal"
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </div>
  )
  return (
    <Row className="Landing">
      <TopBar modalLogin={AdminModalLogin} />
    </Row>
  )
}

export default AdminLogin;
