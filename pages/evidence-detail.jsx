import React, { useEffect, useState, useCallback, useContext } from 'react';
import EvidenceDetail from 'components/organisms/EvidenceDetail/EvidenceDetail';
import { useParams } from 'react-router';
import { getEvidence } from 'api/activityApi';
import { LandingLayout } from 'components/Layouts/LandingLayout/LandingLayout';
import ProjectHeroSectionSmall from 'components/molecules/ProjectHeroSection-small/ProjectHeroSectionSmall';
import useQuery from 'hooks/useQuery';
import { UserContext } from 'components/utils/UserContext';
import customConfig from 'custom-config';
import { formatCurrencyAtTheBeginning, formatTimeframeValue } from 'helpers/formatter';
import { useProject } from '../hooks/useProject';
import Loading from '../components/molecules/Loading/Loading';

export default function EvidenceDetailPage() {
  const [evidence, setEvidence] = useState({});
  const [loadingEvidence, setLoadingEvidence] = useState(true);
  const { projectId, activityId, detailEvidenceId } = useParams();

  const { preview } = useQuery();

  const { user } = useContext(UserContext);
  const isAdmin = user?.isAdmin;

  // Info about project
  const { loading, project } = useProject(projectId);
  const { basicInformation, status, details, budget, editing, inReview, revision } = project || {};
  const { projectName, location, beneficiary, timeframe, timeframeUnit, thumbnailPhoto } =
    basicInformation || {};
  const { currency, currencyType, legalAgreementFile, projectProposalFile } = details || {};
  const { firstName, lastName } = beneficiary || {};
  const beneficiaryName = firstName || lastName ? `${firstName} ${lastName}` : 'No name';

  const activityStatus = project?.milestones
    ?.flatMap(milestones => milestones.activities)
    ?.find(activity => activity.id === parseInt(activityId, 10))?.status;

  const fetchEvidence = useCallback(
    async id => {
      const result = await getEvidence(id);
      const data = { ...result.data, activityStatus };
      setEvidence(data);
      setLoadingEvidence(false);
    },
    [activityStatus]
  );

  useEffect(() => {
    fetchEvidence(detailEvidenceId);
  }, [detailEvidenceId, fetchEvidence]);

  if (loading || loadingEvidence) return <Loading />;

  return (
    <LandingLayout
      project={project}
      disappearHeaderInMobile
      thumbnailPhoto={thumbnailPhoto}
      showPreviewAlert={preview && isAdmin}
      header={
        <ProjectHeroSectionSmall
          revision={revision}
          inReview={inReview}
          title={projectName}
          status={status}
          subtitle={customConfig.NAME}
          country={location}
          beneficiary={beneficiaryName}
          timeframe={formatTimeframeValue(timeframe, timeframeUnit)}
          budget={formatCurrencyAtTheBeginning(currency, budget)}
          legalAgreementUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${legalAgreementFile}`}
          projectProposalUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${projectProposalFile}`}
          preview={preview}
          projectId={projectId}
        />
      }
    >
      {evidence && (
        <EvidenceDetail
          preview={preview}
          evidence={evidence}
          fetchEvidence={fetchEvidence}
          currency={currency}
          currencyType={currencyType}
          isProjectEditing={editing}
        />
      )}
    </LandingLayout>
  );
}
