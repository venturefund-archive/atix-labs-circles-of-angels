import React from 'react';
import Navbar from 'components/atoms/Navbar/Navbar';
import { CoaAlert } from 'components/molecules/CoaAlert/CoaAlert';
import { Icon } from 'antd';
import './landing-draft-layout.scss';
import Footer from 'components/molecules/Footer/Footer';

export const LandingDraftLayout = props => {
  const { header, thumbnailPhoto, project } = props;
  return (
    <div className="landingDraftLayout">
      <Navbar project={project} />
      <CoaAlert
        Icon={
          <Icon
            type="exclamation-circle"
            theme="filled"
            style={{ fontSize: '1.5rem', color: '#ffffff' }}
          />
        }
        className="landingDraftLayout__previewInfoMessage"
        message="The project is in draft version. Once published you will be able to view the rest of the content"
        customColor="blue"
        closable={false}
        show
      />
      <div
        className="landingDraftLayout__header"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 6.87%, rgba(0, 0, 0, 0.800) 80.6%), url(${process.env.NEXT_PUBLIC_URL_HOST}${thumbnailPhoto})`
        }}
      >
        <div className="landingDraftLayout__header__content">{header}</div>
      </div>
      <Footer />
    </div>
  );
};
