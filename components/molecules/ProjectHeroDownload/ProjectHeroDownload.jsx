import React from 'react';
import DownloadIcon from '../../atoms/DownloadIcon/DownloadIcon';

import './_style.scss';

const ProjectHeroDownload = ({ projectProposalUrl, legalAgreementUrl }) => (
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
      <DownloadIcon /> <span>Project proposal</span>
    </a>
    <a
      href={legalAgreementUrl}
      className="agreement--btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <DownloadIcon /> <span>Legal agreement</span>
    </a>
  </div>
);

export default ProjectHeroDownload;
