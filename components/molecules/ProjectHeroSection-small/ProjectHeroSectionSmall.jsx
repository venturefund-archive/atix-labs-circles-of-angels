import React from 'react';
import PropTypes from 'prop-types';
import ProjectStatus from '../ProjectStatus/ProjectStatus';
import ProjectHeroDetails from '../ProjectHeroDetails/ProjectHeroDetails';
import ProjectHeroDownload from '../ProjectHeroDownload/ProjectHeroDownload';

import './_style.scss';

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
}) => (
  <div
    className="hero"
    style={{
      backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 6.87%, rgba(0, 0, 0, 0.800) 80.6%), url(${process.env.NEXT_PUBLIC_URL_HOST}${thumbnailPhoto})`
    }}
  >
    <div className="hero__container">
      <div className="hero__content">
        <ProjectStatus status={status} />
        <div className="hero__content__text">
          <h3>{subtitle}</h3>
          <h1>{title}</h1>
        </div>
      </div>
      <div className="hero__bottom">
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
);

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
};
