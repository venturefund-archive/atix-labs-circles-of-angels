import React from 'react';
import './_style.scss';

const Breadcrumb = ({ route }) => (
  <div className='breadcrumb'>
    <h2 className='breadcrumb__title'>{route}</h2>
  </div>
  )

export default Breadcrumb