import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import './_evidences.scss';
// eslint-disable-next-line import/no-named-as-default
import { message as AntMessage } from 'antd';
import { LandingLayout } from 'components/Layouts/LandingLayout/LandingLayout';
import ProjectHeroSection from 'components/molecules/ProjectHeroSection/ProjectHeroSection';
import { UserContext } from 'components/utils/UserContext';
import GoBackButton from 'components/atoms/GoBackButton/GoBackButton';
import Breadcrumb from 'components/atoms/BreadCrumb/BreadCrumb';
import customConfig from 'custom-config';
import { getActivityEvidences } from 'api/activityApi';
import { formatCurrencyAtTheBeginning, formatTimeframeValue } from 'helpers/formatter';
import { CoaChangelogContainer } from 'components/organisms/CoaChangelogContainer/CoaChangelogContainer';
import useQuery from 'hooks/useQuery';
import { PROJECT_STATUS_ENUM } from 'model/projectStatus';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import Evidences from '../components/organisms/Evidences/Evidences';
import { useProject } from '../hooks/useProject';
import Loading from '../components/molecules/Loading/Loading';
import { EvidenceContext } from '../components/utils/EvidenceContext';

const EvidencesContainer = () => {
  const { texts } = useContext(DictionaryContext);
  const { projectId, activityId } = useParams();
  const ChangelogComponent = useRef();
  const [evidences, setEvidences] = useState([]);
  const [milestone, setMilestone] = useState({});
  const [activity, setActivity] = useState({});
  const [areEvidencesLoading, setIsEvidencesLoading] = useState(false);
  const { loading: isProjectLoading, project } = useProject(projectId);
  const { preview } = useQuery();

  const { user } = useContext(UserContext);
  const isAdmin = user?.isAdmin;

  const getEvidences = async _activity => {
    setIsEvidencesLoading(true);
    const response = await getActivityEvidences(_activity);
    if (response.errors || !response.data) {
      AntMessage.error('An error occurred while fetching the project');
      return;
    }

    setEvidences(response.data.evidences);
    setActivity(response.data.activity);
    setMilestone(response.data.milestone);
    setIsEvidencesLoading(false);
  };
  const { message } = useContext(EvidenceContext);

  useEffect(() => {
    getEvidences(activityId);

    // eslint-disable-next-line
  }, []);

  if (isProjectLoading) return <Loading />;

  const { basicInformation, status, details, budget, inReview, revision, editing } = project;
  const { projectName, location, beneficiary, timeframe, timeframeUnit, thumbnailPhoto } =
    basicInformation || {};
  const { currency, legalAgreementFile, projectProposalFile } = details || {};
  const beneficiaryFirstName = beneficiary?.firstName;
  const beneficiaryLastName = beneficiary?.lastName;
  const beneficiaryCompleteName =
    beneficiaryFirstName || beneficiaryLastName
      ? `${beneficiaryFirstName} ${beneficiaryLastName}`
      : 'No name';

  function getChangelog() {
    ChangelogComponent.current.fetchChangelog();
  }

  return (
    <LandingLayout
      project={project}
      disappearHeaderInMobile
      showPreviewAlert={preview && isAdmin}
      showEditingAlert={(isAdmin || status !== PROJECT_STATUS_ENUM.DRAFT) && editing}
      header={
        <ProjectHeroSection
          revision={revision}
          inReview={inReview}
          title={projectName}
          status={status}
          subtitle={customConfig.NAME}
          country={location}
          beneficiary={beneficiaryCompleteName}
          timeframe={formatTimeframeValue({ timeframe, timeframeUnit, texts })}
          budget={formatCurrencyAtTheBeginning(currency, budget)}
          legalAgreementUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${legalAgreementFile}`}
          projectProposalUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${projectProposalFile}`}
          blockchainHistoryUrl={preview ? `/${projectId}/changelog?preview=true` : `/${projectId}/changelog`}
          message={message}
          preview={preview}
          projectId={projectId}
        />
      }
      thumbnailPhoto={thumbnailPhoto}
    >
      <div className="p-evidences__content">
        <div>
          <GoBackButton goBackTo={preview ? `/${projectId}?preview=true` : `/${projectId}`} />
          <Breadcrumb route={`${milestone?.title} / ${activity?.title} / Evidences`} />
        </div>
        <Evidences
          preview={preview}
          project={project}
          activity={activity}
          evidences={evidences}
          areEvidencesLoading={areEvidencesLoading}
          getEvidences={getEvidences}
          getChangelog={getChangelog}
        />
        <CoaChangelogContainer
          title="Activity Changelog"
          emptyText="No activities on the changelog yet"
          projectId={projectId}
          activityId={activityId}
          currency={currency}
          ref={ChangelogComponent}
        />
      </div>
    </LandingLayout>
  );
};

export default EvidencesContainer;
