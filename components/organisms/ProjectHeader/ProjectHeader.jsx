import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../molecules/Loading/Loading';
import Layout from '../../molecules/Layout/Layout';
import ProjectHeroSection from '../../molecules/ProjectHeroSection/ProjectHeroSection';
import customConfig from '../../../custom-config';
import { formatCurrency, formatTimeframeValue } from '../../../helpers/formatter';
import { useProject } from '../../../hooks/useProject';

const ProjectHeader = ({ children, id }) => {
    const { loading, project } = useProject(id)
    if (loading) return <Loading />;

    const { basicInformation, status, details, budget } = project;
    const { projectName, location, beneficiary, timeframe, timeframeUnit, thumbnailPhoto } =
    basicInformation || {};
    const { currency, legalAgreementFile, projectProposalFile } =
    details || {};
    const beneficiaryFirstName = beneficiary?.firstName;
    const beneficiaryLastName = beneficiary?.lastName;
    const beneficiaryCompleteName =
        beneficiaryFirstName || beneficiaryLastName
            ? `${beneficiaryFirstName} ${beneficiaryLastName}`
            : 'No name';

    return (
      <Layout>
        <ProjectHeroSection
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
        />
          {children}
      </Layout>
    );
}

export default ProjectHeader;

ProjectHeader.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
};
