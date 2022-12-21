import React from 'react';
import PropTypes from 'prop-types';
import ProjectStatus from '../ProjectStatus/ProjectStatus';
import ProjectHeroDetails from '../ProjectHeroDetails/ProjectHeroDetails';
import ProjectHeroDownload from '../ProjectHeroDownload/ProjectHeroDownload';

import './_style.scss';

const ProjectHeroSection = ({
  status,
  subtitle,
  title,
  country,
  timeframe,
  budget,
  beneficiary,
  projectProposalUrl,
  legalAgreementUrl,
  onClickProgressButton,
  blockchainHistoryUrl
}) => (
  <div className="hero">
    <div className="content">
      <ProjectStatus status={status} blockchainHistoryUrl={blockchainHistoryUrl} />
      <div className="text">
        <h3>{subtitle}</h3>
        <h1>{title}</h1>
      </div>
    </div>

    <div className="bottom">
      <div className="btn">
        <button type="button" className="progress--btn" onClick={onClickProgressButton}>
          <span>See the progress</span>
        </button>
      </div>
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
);

export default ProjectHeroSection;

ProjectHeroSection.defaultProps = {
  subtitle: undefined,
  country: 'Thailand',
  timeframe: '2 Months',
  budget: '$ 48,000',
  beneficiary: 'Joe Demin',
  projectProposalUrl: undefined,
  legalAgreementUrl: undefined,
  onClickProgressButton: undefined,
  blockchainHistoryUrl: undefined
};

ProjectHeroSection.propTypes = {
  status: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  country: PropTypes.string,
  timeframe: PropTypes.string,
  budget: PropTypes.string,
  beneficiary: PropTypes.string,
  projectProposalUrl: PropTypes.string,
  legalAgreementUrl: PropTypes.string,
  onClickProgressButton: PropTypes.func,
  blockchainHistoryUrl: PropTypes.string
};
