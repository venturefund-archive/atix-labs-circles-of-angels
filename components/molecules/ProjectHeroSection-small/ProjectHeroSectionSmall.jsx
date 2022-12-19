import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProjectStatus from '../ProjectStatus/ProjectStatus';
import ProjectHeroDetails from '../ProjectHeroDetails/ProjectHeroDetails';
import ProjectHeroDownload from '../ProjectHeroDownload/ProjectHeroDownload';

import './_style.scss';
import { CoaAlert } from '../CoaAlert/CoaAlert';
import { EvidenceContext } from '../../utils/EvidenceContext';

const ProjectHeroSectionSmall = ({
  status,
  subtitle,
  title,
  country,
  timeframe,
  budget,
  beneficiary,
  thumbnailPhoto,
  projectProposalUrl,
  legalAgreementUrl,
  message,
}) => {
  const [show, setShow] = useState(Boolean(message));
  const { clearMessage } = useContext(EvidenceContext);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setShow(false);
        clearMessage();
      }, 3000);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {message && <CoaAlert
            className='heroSmall__message'
            message={message}
            customColor='green'
            closable
            Icon={<img src="/static/images/check.svg" alt="icon"/>}
            show={show}
      />}
      <div
            className="heroSmall"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 6.87%, rgba(0, 0, 0, 0.800) 80.6%), url(${process.env.NEXT_PUBLIC_URL_HOST}${thumbnailPhoto})`
            }}
      >
        <div className="heroSmall__container">
          <div className="heroSmall__content">
            <ProjectStatus status={status} />
            <div className="heroSmall__content__text">
              <h3>{subtitle}</h3>
              <h1>{title}</h1>
            </div>
          </div>
          <div className="heroSmall__bottom">
            <div className="backoffice">
              <ProjectHeroDetails
                    country={country}
                    timeframe={timeframe}
                    budget={budget}
                    beneficiary={beneficiary}
              />
              <ProjectHeroDownload
                    projectProposalUrl={projectProposalUrl}
                    legalAgreementUrl={legalAgreementUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectHeroSectionSmall;

ProjectHeroSectionSmall.defaultProps = {
  subtitle: undefined,
  country: 'Thailand',
  timeframe: '2 Months',
  budget: '$ 48,000',
  beneficiary: 'Joe Demin',
  thumbnailPhoto: '',
  projectProposalUrl: undefined,
  legalAgreementUrl: undefined,
  message: undefined,
};

ProjectHeroSectionSmall.propTypes = {
  status: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  country: PropTypes.string,
  timeframe: PropTypes.string,
  budget: PropTypes.string,
  beneficiary: PropTypes.string,
  thumbnailPhoto: PropTypes.string,
  projectProposalUrl: PropTypes.string,
  legalAgreementUrl: PropTypes.string,
  message: PropTypes.string,
};
