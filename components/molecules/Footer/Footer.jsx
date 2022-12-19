import React from 'react';
import { Link } from 'react-router-dom';
import './_style.scss';
import customConfig from '../../../custom-config';

const Footer = () => (
  <footer className="footer">
    <div className='footer__left'>
      <img src={customConfig.LOGO_PATH} alt="CoA" className='footer__left__logo'/>
      <span className='footer__left__coaText'>
        CIRCLES <span className='footer__left__coaText__connector'>OF</span> ANGELS
      </span>
    </div>
    <div className='footer__right'>
      <Link
          to='/terms-and-conditions'
          target="_blank"
          className='footer__right__termsConditions'
      >
          Terms & conditions
      </Link>
      <span className='footer__right__copyright'>
        &#169;{(new Date()).getFullYear()} Circle of Angels
      </span>
    </div>
  </footer>
);

export default Footer;
