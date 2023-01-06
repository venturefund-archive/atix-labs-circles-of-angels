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

export default function ProjectChangeLog() {
  const { projectId } = useParams();
  const history = useHistory();
  const { loading, project } = useProject(projectId);
  const { preview } = useQuery();

  const { user } = useContext(UserContext);
  const isAdmin = user?.isAdmin;
  if (loading) return <Loading />;

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
    <LandingLayout
      project={project}
      showPreviewAlert={preview && isAdmin}
      disappearHeaderInMobile
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
          Go Back
        </CoaTextButton>
        <TitlePage textTitle="Blockchain Changelog" textColor="#4C7FF7" />
        <CoaChangelogContainer
          title="Project Changelog"
          projectId={projectId}
          withInfinityHeight
          currency={currency}
        />
      </div>
    </LandingLayout>
  );
}
