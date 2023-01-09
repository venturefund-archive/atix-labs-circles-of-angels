import React, { useEffect, useContext } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import Navbar from 'components/atoms/Navbar/Navbar';
import { CoaAlert } from 'components/molecules/CoaAlert/CoaAlert';
import Footer from 'components/molecules/Footer/Footer';
import { useHistory } from 'react-router';
import './landing-layout.scss';
import { DictionaryContext } from 'components/utils/DictionaryContext';

export const LandingLayout = ({
  children,
  header,
  thumbnailPhoto,
  disappearHeaderInMobile,
  headerAnimation,
  showPreviewAlert,
  showEditingAlert,
  project
}) => {
  const history = useHistory();
  const { texts } = useContext(DictionaryContext);

  useEffect(() => {
    const handleScroll = () => {
      const landingHeader = document.querySelector('.landingLayout__header');
      const landingHeaderHeight = landingHeader.offsetHeight;
      const landingHero = document.querySelector('.hero');
      if (window.scrollY > 0 && landingHeaderHeight <= 720) {
        landingHeader.classList.add('scrolledLadingHeader', 'scrolledLadingHeaderAnimate');
        landingHeader.style.setProperty('--topLadingHeader', `${showPreviewAlert? 120 : 60 }px`);
        landingHero.classList.add('scrolledHero', 'scrolledLadingHeaderAnimate');
      } else if(window.scrollY === 0 && landingHeaderHeight===220) {
        landingHeader.classList.remove('scrolledLadingHeader');
        landingHero.classList.remove('scrolledHero');
      }
    }
    if(headerAnimation) {
      window.addEventListener('scroll', handleScroll);
    } else {
      const landingHero = document.querySelector('.hero');
      landingHero.classList.add('scrolledHero');
      const landingHeader = document.querySelector('.landingLayout__header');
      landingHeader.classList.add('scrolledLadingHeader');
      landingHeader.style.setProperty('--topLadingHeader', `${showPreviewAlert? 120 : 60 }px`);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerAnimation, showPreviewAlert]);

  return (
    <div className="landingLayout">
      <Navbar project={project} />
      <CoaAlert
        className="landingLayout__previewInfoMessage"
        message={texts?.header?.preview || 'You are viewing the preview of your project'}
        customColor="blue"
        closable={false}
        show={showPreviewAlert}
        closeContent={
          <CoaButton
            onClick={() => history.push(`/project/edit/${project?.id}`)}
            type="ghost"
            primaryColor="white"
          >
            <Icon type="arrow-left" /> {texts?.general?.backToEdit || 'Back to edit'}
          </CoaButton>
        }
      />
      <div
        className={classNames('landingLayout__header', {
          '--notShowInMobile': disappearHeaderInMobile
        })}
        style={{
          '--landingHeight': headerAnimation? '720px': '220px',
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 6.87%, rgba(0, 0, 0, 0.800) 80.6%), url(${process.env.NEXT_PUBLIC_URL_HOST}${thumbnailPhoto})`
        }}
      >
        <div className="landingLayout__header__content">{header}</div>
      </div>
      <div className="landingLayout__body">
        <div className="landingLayout__body__content">
          { showEditingAlert
            ?
              <div className="landingLayout__alertEditedProject">
                {texts?.general?.alertEditing || 'This project is being edited. The project is not enable until the edition is finished'}
              </div>
            : null
          }
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};
