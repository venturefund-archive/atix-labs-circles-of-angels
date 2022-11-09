import React from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';

export default function BackgroundLanding({ children }) {
  return (

    <Row
      className='Landing'
      style={{
        backgroundImage: 'url(/static/images/COA-Login-Image-Background.png)',
        backgroundSize: 'cover',
        backgroundPositionX: 'center'
      }}
    >
      {children}
    </Row>
  )
}

BackgroundLanding.propTypes = {
  children: PropTypes.node.isRequired
}
