import React, { useContext } from 'react';
import './_project-changelog.scss';
import { useHistory, useParams } from 'react-router';
import { useProject } from 'hooks/useProject';
import Loading from 'components/molecules/Loading/Loading';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { CoaChangelogContainer } from 'components/organisms/CoaChangelogContainer/CoaChangelogContainer';
import { Icon } from 'antd';
import { LandingLayout } from 'components/Layouts/LandingLayout/LandingLayout';
import ProjectHeroSection from 'components/molecules/ProjectHeroSection/ProjectHeroSection';
import customConfig from 'custom-config';
import { formatCurrencyAtTheBeginning, formatTimeframeValue } from 'helpers/formatter';
import useQuery from 'hooks/useQuery';
import { UserContext } from 'components/utils/UserContext';
import { PROJECT_STATUS_ENUM } from 'model/projectStatus';
import { DictionaryContext } from 'components/utils/DictionaryContext';

export default function ProjectChangeLog() {
  const { texts } = useContext(DictionaryContext);
  const { projectId } = useParams();
  const history = useHistory();
  const { loading, project } = useProject(projectId);
  const { preview } = useQuery();

  const { user } = useContext(UserContext);
  const isAdmin = user?.isAdmin;
  if (loading) return <Loading />;

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

  return (
    <LandingLayout
      project={project}
      showPreviewAlert={preview && isAdmin}
      showEditingAlert={(isAdmin || status !== PROJECT_STATUS_ENUM.DRAFT) && editing}
      disappearHeaderInMobile
      header={
        <ProjectHeroSection
          revision={revision}
          inReview={inReview}
          title={projectName}
          status={status}
          subtitle={customConfig.ORGANIZATION_NAME}
          country={location}
          beneficiary={beneficiaryCompleteName}
          timeframe={formatTimeframeValue({ timeframe, timeframeUnit, texts })}
          budget={formatCurrencyAtTheBeginning(currency, budget)}
          legalAgreementUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${legalAgreementFile}`}
          projectProposalUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${projectProposalFile}`}
          blockchainHistoryUrl={
            preview ? `/${projectId}/changelog?preview=true` : `/${projectId}/changelog`
          }
          preview={preview}
          projectId={projectId}
        />
      }
      thumbnailPhoto={thumbnailPhoto}
    >
      <div className="p-projectChangelog__content">
        <CoaTextButton
          className="p-projectChangelog__goBackButton"
          onClick={() => history.push(preview ? `/${projectId}?preview=true` : `/${projectId}`)}
        >
          <Icon type="arrow-left" />
          {texts?.general?.btnGoBack || 'Go back'}
        </CoaTextButton>
        <TitlePage textTitle={texts?.general?.blockchainChangelog || 'Blockchain Changelog'} textColor="#4C7FF7" />
        <CoaChangelogContainer
          title={texts?.changelog?.title || 'Project Changelog'}
          projectId={projectId}
          withInfinityHeight
          currency={currency}
        />
      </div>
    </LandingLayout>
  );
}
