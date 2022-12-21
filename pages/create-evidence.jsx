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
  const { id, activityId } = useParams();
  const { loading, project } = useProject(id)

  if (loading) return <Loading/>;

  const { basicInformation, status, details, budget, milestones } = project;
  const { projectName, location, beneficiary, timeframe, timeframeUnit, thumbnailPhoto } =
    basicInformation || {};
  const { currency, legalAgreementFile, projectProposalFile } = details || {};
  const beneficiaryFirstName = beneficiary?.firstName;
  const beneficiaryLastName = beneficiary?.lastName;
  const beneficiaryCompleteName =
    beneficiaryFirstName || beneficiaryLastName
      ? `${beneficiaryFirstName} ${beneficiaryLastName}`
      : 'No name';

  const milestone = milestones
    .find( ({ activities }) =>
      activities.map((_activity)=>_activity.id)
      .includes(parseInt(activityId, 10))
    ) || {};
  const activity = milestone?.activities
    .find((_activity) => _activity.id ===parseInt(activityId, 10));
  const breadCrumbPath = `${milestone?.title} / ${activity?.title} / create-evidence`;

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
      <EvidenceForm breadCrumbPath={breadCrumbPath} />
    </LandingLayout>
  );
}

export default CreateEvidence;
