import React from 'react';
import { Link } from 'react-router-dom';
import './_style.scss';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import customConfig from '../../../custom-config';

const Footer = () => {
  const { texts } = React.useContext(DictionaryContext);

  return (
    <footer className="footer">
      <div className="footer__left">
        <img src={customConfig.LARGE_LOGO_PATH} alt="CoA" className="footer__left__logo" />
      </div>
      <div className="footer__right">
        <Link to="/terms-and-conditions" className="footer__right__termsConditions">
          {texts?.general?.['terms&Conditions'] || 'Terms & conditions'}
        </Link>
        <span className="footer__right__copyright">
          &#169;{new Date().getFullYear()} {customConfig.ORGANIZATION_NAME}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
