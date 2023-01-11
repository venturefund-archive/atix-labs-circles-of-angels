import React, { useContext } from 'react';
import { LandingDraftLayout } from 'components/Layouts/LandingDraftLayout/LandingDraftLayout';
import ProjectHeroSection from 'components/molecules/ProjectHeroSection/ProjectHeroSection';
import { formatCurrencyAtTheBeginning, formatTimeframeValue } from 'helpers/formatter';
import customConfig from 'custom-config';
import { DictionaryContext } from 'components/utils/DictionaryContext';

export const PreviewDraftProject = ({ project, isAdmin, id, preview }) => {
  const { texts } = useContext(DictionaryContext);
  const { basicInformation, status, details, budget, inReview, revision } = project || {};
  const { projectName, location, beneficiary, timeframe, timeframeUnit, thumbnailPhoto } =
    basicInformation || {};
  const { currency, legalAgreementFile, projectProposalFile } = details || {};
  const beneficiaryFirstName = beneficiary?.firstName;
  const beneficiaryLastName = beneficiary?.lastName;
  const beneficiaryCompleteName =
    beneficiaryFirstName || beneficiaryLastName
      ? `${beneficiaryFirstName} ${beneficiaryLastName}`
      : texts?.general?.noName || 'No name';
  return (
    <LandingDraftLayout
      project={project}
      projectId={project?.id}
      showPreviewAlert={preview && isAdmin}
      header={
        <ProjectHeroSection
          inReview={inReview}
          title={projectName}
          status={status}
          subtitle={customConfig.ORGANIZATION_NAME}
          country={location}
          beneficiary={beneficiaryCompleteName}
          timeframe={formatTimeframeValue(timeframe, timeframeUnit)}
          budget={formatCurrencyAtTheBeginning(currency, budget)}
          thumbnailPhoto={thumbnailPhoto}
          revision={revision}
        />
      }
      thumbnailPhoto={thumbnailPhoto}
    >
      PreviewDraftProject
    </LandingDraftLayout>
  );
};
