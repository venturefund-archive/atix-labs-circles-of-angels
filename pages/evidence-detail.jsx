import React, { useEffect, useState } from 'react';
import EvidenceDetail from 'components/organisms/EvidenceDetail/EvidenceDetail';
import { useHistory, useParams } from 'react-router';
import { getEvidence } from 'api/activityApi';
import { LandingLayout } from 'components/Layouts/LandingLayout/LandingLayout';
import ProjectHeroSectionSmall from 'components/molecules/ProjectHeroSection-small/ProjectHeroSectionSmall';
import customConfig from 'custom-config';
import { formatCurrency, formatTimeframeValue } from 'helpers/formatter';
import { useProject } from '../hooks/useProject';
import Loading from '../components/molecules/Loading/Loading';

export default function EvidenceDetailPage() {
  const [evidence, setEvidence] = useState({});
  const { location: { pathname } } = useHistory();
  const { projectId, detailEvidenceId } = useParams();

  // Info about project
  const { loading, project } = useProject(projectId);
  const { basicInformation, status, details, budget } = project || {};
  const { projectName, location, beneficiary, timeframe, timeframeUnit, thumbnailPhoto } =
    basicInformation || {};
  const { currency, legalAgreementFile, projectProposalFile } =
    details || {};
  const { firstName, lastName } = beneficiary || {};
  const beneficiaryName = firstName || lastName ? `${firstName} ${lastName}`: 'No name';


  const fetchEvidence = async (id) => {
    const result = await getEvidence(id)
    setEvidence(result.data)
  }

  useEffect(() => {
    fetchEvidence(detailEvidenceId);
  }, [detailEvidenceId, pathname]);

  if (loading) return <Loading />;

  return (
    <LandingLayout
      disappearHeaderInMobile
      thumbnailPhoto={thumbnailPhoto}
      header={
        <ProjectHeroSectionSmall
          title={projectName}
          status={status}
          subtitle={customConfig.NAME}
          country={location}
          beneficiary={beneficiaryName}
          timeframe={formatTimeframeValue(timeframe, timeframeUnit)}
          budget={formatCurrency(currency, budget)}
          legalAgreementUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${legalAgreementFile}`}
          projectProposalUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${projectProposalFile}`}
        />
      }
    >
      {evidence && <EvidenceDetail evidence={evidence} fetchEvidence={fetchEvidence}/>}
    </LandingLayout>
  )
}
