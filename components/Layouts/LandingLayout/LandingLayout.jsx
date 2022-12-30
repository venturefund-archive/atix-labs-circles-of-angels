import { Icon } from 'antd';
import classNames from 'classnames';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import Navbar from 'components/atoms/Navbar/Navbar';
import { CoaAlert } from 'components/molecules/CoaAlert/CoaAlert';
import Footer from 'components/molecules/Footer/Footer';
import React from 'react';
import { useHistory } from 'react-router';
import './landing-layout.scss';

export const LandingLayout = ({
  children,
  header,
  thumbnailPhoto,
  disappearHeaderInMobile,
  showPreviewAlert,
  projectId,
  project
}) => {
  const history = useHistory();

  return (
    <div className="landingLayout">
      <Navbar project={project} />
      <CoaAlert
        className="landingLayout__previewInfoMessage"
        message="You are viewing the preview of your project"
        customColor="blue"
        closable={false}
        show={showPreviewAlert}
        closeContent={
          <CoaButton
            onClick={() => history.push(`/project/edit/${projectId}`)}
            type="ghost"
            primaryColor="white"
          >
            <Icon type="arrow-left" /> Back to edit
          </CoaButton>
        }
      />
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
