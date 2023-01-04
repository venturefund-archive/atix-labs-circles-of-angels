import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import DownloadIcon from '../../atoms/DownloadIcon/DownloadIcon';

import './_style.scss';

const ProjectHeroMenu = ({ texts, projectProposalUrl, legalAgreementUrl }) => (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href={projectProposalUrl}>
        {texts?.header?.btnProposal || 'Project proposal'}
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href={legalAgreementUrl}>
        {texts?.header?.btnAgreement || 'Legal agreement'}
      </a>
    </Menu.Item>
  </Menu>
);

ProjectHeroMenu.defaultProps = {
  texts: undefined,
  projectProposalUrl: undefined,
  legalAgreementUrl: undefined
};

ProjectHeroMenu.propTypes = {
  texts: PropTypes.objectOf(PropTypes.any),
  projectProposalUrl: PropTypes.string,
  legalAgreementUrl: PropTypes.string
};

const ProjectHeroDownload = ({ projectProposalUrl, legalAgreementUrl }) => {
  const { texts } = React.useContext(DictionaryContext);

  return (
    <div className="download">
      <div className="download-btn--mobile">
        <Dropdown
          overlay={<ProjectHeroMenu {...{ texts, projectProposalUrl, legalAgreementUrl }} />}
          placement="topLeft"
        >
          <CoaTextButton>
            <DownloadIcon />
          </CoaTextButton>
        </Dropdown>
      </div>
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
};

ProjectHeroDownload.defaultProps = {
  projectProposalUrl: undefined,
  legalAgreementUrl: undefined
};

ProjectHeroDownload.propTypes = {
  projectProposalUrl: PropTypes.string,
  legalAgreementUrl: PropTypes.string
};

export default ProjectHeroDownload;
