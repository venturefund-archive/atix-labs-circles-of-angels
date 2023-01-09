import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { LandingLayout } from 'components/Layouts/LandingLayout/LandingLayout';
import ProjectHeroSection from 'components/molecules/ProjectHeroSection/ProjectHeroSection';
import customConfig from 'custom-config';
import useQuery from 'hooks/useQuery';
import { UserContext } from 'components/utils/UserContext';
import { formatCurrencyAtTheBeginning, formatTimeframeValue } from 'helpers/formatter';
import { EvidenceForm } from '../components/molecules/EvidenceForm/EvidenceForm';
import { useProject } from '../hooks/useProject';
import Loading from '../components/molecules/Loading/Loading';

const CreateEvidence = () => {
  const { projectId, activityId } = useParams();
  const { loading, project } = useProject(projectId);

  const { preview } = useQuery();

  const { user } = useContext(UserContext);
  const isAdmin = user?.isAdmin;

  if (loading) return <Loading />;

  const { basicInformation, status, details, budget, milestones, inReview, revision } = project;
  const { projectName, location, beneficiary, timeframe, timeframeUnit, thumbnailPhoto } =
    basicInformation || {};
  const { currency, legalAgreementFile, projectProposalFile } = details || {};
  const beneficiaryFirstName = beneficiary?.firstName;
  const beneficiaryLastName = beneficiary?.lastName;
  const beneficiaryCompleteName =
    beneficiaryFirstName || beneficiaryLastName
      ? `${beneficiaryFirstName} ${beneficiaryLastName}`
      : 'No name';

  const milestone =
    milestones.find(({ activities }) =>
      activities.map(_activity => _activity.id).includes(parseInt(activityId, 10))
    ) || {};
  const activity = milestone?.activities.find(
    _activity => _activity.id === parseInt(activityId, 10)
  );
  const breadCrumbPath = `${milestone?.title} / ${activity?.title} / create-evidence`;

  return (
    <LandingLayout
      project={project}
      disappearHeaderInMobile
      showPreviewAlert={preview && isAdmin}
      header={
        <ProjectHeroSection
          revision={revision}
          inReview={inReview}
          title={projectName}
          status={status}
          subtitle={customConfig.NAME}
          country={location}
          beneficiary={beneficiaryCompleteName}
          timeframe={formatTimeframeValue(timeframe, timeframeUnit)}
          budget={formatCurrencyAtTheBeginning(currency, budget)}
          legalAgreementUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${legalAgreementFile}`}
          projectProposalUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${projectProposalFile}`}
          blockchainHistoryUrl={preview ? `/${projectId}/changelog?preview=true` : `/${projectId}/changelog`}
          preview={preview}
          projectId={projectId}
        />
      }
      thumbnailPhoto={thumbnailPhoto}
    >
      <EvidenceForm breadCrumbPath={breadCrumbPath} />
    </LandingLayout>
  );
};

export default CreateEvidence;
