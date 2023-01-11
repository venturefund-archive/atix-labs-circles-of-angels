import React from 'react';
import { LandingDraftLayout } from 'components/Layouts/LandingDraftLayout/LandingDraftLayout';
import ProjectHeroSection from 'components/molecules/ProjectHeroSection/ProjectHeroSection';

export const PreviewDraftProject = ({ project }) => {
  const { basicInformation, status, details, users, budget, editing, cloneId, inReview, revision } =
    project || {};
  return (
    <LandingDraftLayout
      project={project}
      projectId={project?.id}
      header={
        <ProjectHeroSection
          inReview={inReview}
          title={projectName}
          status={status}
          subtitle={customConfig.NAME}
          country={location}
          beneficiary={beneficiaryCompleteName}
          timeframe={formatTimeframeValue(timeframe, timeframeUnit)}
          budget={formatCurrencyAtTheBeginning(currency, budget)}
          thumbnailPhoto={thumbnailPhoto}
          legalAgreementUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${legalAgreementFile}`}
          projectProposalUrl={`${process.env.NEXT_PUBLIC_URL_HOST}${projectProposalFile}`}
          blockchainHistoryUrl={preview ? `/${id}/changelog?preview=true` : `/${id}/changelog`}
          revision={revision}
          isAdmin={isAdmin}
        />
      }
      thumbnailPhoto={thumbnailPhoto}
    >
      PreviewDraftProject
    </LandingDraftLayout>
  );
};
