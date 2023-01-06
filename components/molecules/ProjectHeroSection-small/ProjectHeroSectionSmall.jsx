import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { PROJECT_STATUS_ENUM } from 'model/projectStatus';
import { UserContext } from 'components/utils/UserContext';
import ProjectStatus from '../ProjectStatus/ProjectStatus';
import ProjectHeroDetails from '../ProjectHeroDetails/ProjectHeroDetails';
import ProjectHeroDownload from '../ProjectHeroDownload/ProjectHeroDownload';

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
  projectProposalUrl,
  legalAgreementUrl,
  message,
  inReview,
  revision,
  preview,
  projectId
}) => {
  const [show, setShow] = useState(Boolean(message));
  const { clearMessage } = useContext(EvidenceContext);
  const { user } = useContext(UserContext);
  const isAdmin = user?.isAdmin;

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
      {message && (
        <CoaAlert
          className="heroSmall__message"
          message={message}
          customColor="green"
          closable
          Icon={<img src="/static/images/check.svg" alt="icon" />}
          show={show}
        />
      )}
      <div className="heroSmall">
        <div className="heroSmall__container">
          <div className="heroSmall__content">
            <ProjectStatus
              isAdmin={isAdmin}
              status={inReview ? PROJECT_STATUS_ENUM.IN_REVIEW : status}
              blockchainHistoryUrl={
                preview ? `/${projectId}/changelog?preview=true` : `/${projectId}/changelog`
              }
            />
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
                revision={revision}
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
};

export default ProjectHeroSectionSmall;

ProjectHeroSectionSmall.defaultProps = {
  subtitle: undefined,
  country: 'Thailand',
  timeframe: '2 Months',
  budget: '$ 48,000',
  beneficiary: 'Joe Demin',
  projectProposalUrl: undefined,
  legalAgreementUrl: undefined,
  message: undefined
};

ProjectHeroSectionSmall.propTypes = {
  status: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  country: PropTypes.string,
  timeframe: PropTypes.string,
  budget: PropTypes.string,
  beneficiary: PropTypes.string,
  projectProposalUrl: PropTypes.string,
  legalAgreementUrl: PropTypes.string,
  message: PropTypes.string
};
