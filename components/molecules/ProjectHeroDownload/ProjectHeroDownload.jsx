import React from 'react';
import DownloadIcon from '../../atoms/DownloadIcon/DownloadIcon';

import './_style.scss';

const ProjectHeroDownload = () =>(
  <div className="download">
    <a href='/' className="download-btn--mobile">
      <DownloadIcon />
    </a>

    <a href='/' className="proposal--btn">
      <DownloadIcon /> <span>Project proposal</span>
    </a>
    <a href='/' className="agreement--btn">
      <DownloadIcon /> <span>Legal agreement</span>
    </a>
  </div>
)

export default ProjectHeroDownload;
