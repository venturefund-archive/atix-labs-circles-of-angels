import React from 'react';
import { useParams } from 'react-router';
import { LandingLayout } from 'components/Layouts/LandingLayout/LandingLayout';
import ProjectHeroSectionSmall from 'components/molecules/ProjectHeroSection-small/ProjectHeroSectionSmall';
import customConfig from 'custom-config';
import { formatCurrency, formatTimeframeValue } from 'helpers/formatter';
import { EvidenceForm } from '../components/molecules/EvidenceForm/EvidenceForm';
import { useProject } from '../hooks/useProject';
import Loading from '../components/molecules/Loading/Loading';


const CreateEvidence = () => {
    const { id } = useParams();
    const { loading, project } = useProject(id)

    if (loading) return <Loading/>;

    const { basicInformation, status, details, budget } = project;
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
      <LandingLayout
      disappearHeaderInMobile
      header={
        <ProjectHeroSectionSmall
          title={projectName}
          status={status}
          subtitle={customConfig.NAME}
          country={location}
          beneficiary={beneficiaryCompleteName}
          timeframe={formatTimeframeValue(timeframe, timeframeUnit)}
          budget={formatCurrency(currency, budget)}
          legalAgreementUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${legalAgreementFile}`}
          projectProposalUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${projectProposalFile}`}
        />
      }
      thumbnailPhoto={thumbnailPhoto}
      >
        <EvidenceForm/>
      </LandingLayout>
    )
}

export default CreateEvidence;
