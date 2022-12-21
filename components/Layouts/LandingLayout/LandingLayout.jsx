import classNames from 'classnames';
import Navbar from 'components/atoms/Navbar/Navbar';
import Footer from 'components/molecules/Footer/Footer';
import React from 'react';
import './landing-layout.scss';

export const LandingLayout = ({ children, header, thumbnailPhoto, disappearHeaderInMobile }) => {
  return (
    <div className="landingLayout">
      <Navbar />
      <div
        className={classNames('landingLayout__header', {
          '--notShowInMobile': disappearHeaderInMobile
        })}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 6.87%, rgba(0, 0, 0, 0.800) 80.6%), url(${process.env.NEXT_PUBLIC_URL_HOST}${thumbnailPhoto})`
        }}
      >
        <div className="landingLayout__header__content">{header}</div>
      </div>
      <div className="landingLayout__body">
        <div className="landingLayout__body__content">{children}</div>
      </div>
      <Footer />
    </div>
  );
};
