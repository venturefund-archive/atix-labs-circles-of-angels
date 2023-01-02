import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../molecules/Layout/Layout';
import ProjectHeroSectionSmall from '../../molecules/ProjectHeroSection-small/ProjectHeroSectionSmall';
import customConfig from '../../../custom-config';
import { formatCurrency, formatTimeframeValue } from '../../../helpers/formatter';

const ProjectHeader = ({ project, children, message }) => {
  const { basicInformation, status, details, budget, inReview, revision } = project;
  const { projectName, location, beneficiary, timeframe, timeframeUnit, thumbnailPhoto } =
    basicInformation || {};
  const { currency, legalAgreementFile, projectProposalFile } = details || {};
  const beneficiaryFirstName = beneficiary?.firstName;
  const beneficiaryLastName = beneficiary?.lastName;
  const beneficiaryCompleteName =
    beneficiaryFirstName || beneficiaryLastName
      ? `${beneficiaryFirstName} ${beneficiaryLastName}`
      : 'No name';

  return (
    <Layout>
      <ProjectHeroSectionSmall
        revision={revision}
        inReview={inReview}
        title={projectName}
        status={status}
        subtitle={customConfig.NAME}
        country={location}
        beneficiary={beneficiaryCompleteName}
        timeframe={formatTimeframeValue(timeframe, timeframeUnit)}
        budget={formatCurrency(currency, budget)}
        thumbnailPhoto={thumbnailPhoto}
        legalAgreementUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${legalAgreementFile}`}
        projectProposalUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${projectProposalFile}`}
        message={message}
      />
      {children}
    </Layout>
  );
};

export default ProjectHeader;

ProjectHeader.defaultProps = {
  message: undefined
};

ProjectHeader.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  project: PropTypes.object.isRequired,
  message: PropTypes.string
};
