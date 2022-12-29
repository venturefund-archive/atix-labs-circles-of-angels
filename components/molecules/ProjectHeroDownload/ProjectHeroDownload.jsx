import React from 'react';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import DownloadIcon from '../../atoms/DownloadIcon/DownloadIcon';

import './_style.scss';

const ProjectHeroDownload = ({ projectProposalUrl, legalAgreementUrl }) => {
  const { texts } = React.useContext(DictionaryContext);

  return (
    <div className="download">
      <a href="/" className="download-btn--mobile">
        <DownloadIcon />
      </a>
      <a
        href={projectProposalUrl}
        className="proposal--btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <DownloadIcon /> <span>{texts?.header?.btnProposal || 'Project proposal'}</span>
      </a>
      <a
        href={legalAgreementUrl}
        className="agreement--btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <DownloadIcon /> <span>{texts?.header?.btnAgreement || 'Legal agreement'}</span>
      </a>
    </div>
  );
}

export default ProjectHeroDownload;
