import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

export default function NavbarLogin({ loginFn }) {
  return (
    <div className='navbar__login__wrapper'>
      <Button
        className='navbar__login__button'
        onClick={loginFn}
      >
        Login
      </Button>
    </div>
  )
}

NavbarLogin.defaultProps = {
  loginFn: () => undefined
}

NavbarLogin.propTypes = {
  loginFn: PropTypes.func
}
