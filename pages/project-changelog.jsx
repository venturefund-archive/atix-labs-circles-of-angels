import React from 'react';
import './_project-changelog.scss';
import { useHistory, useParams } from 'react-router';
import ProjectHeader from 'components/organisms/ProjectHeader/ProjectHeader';
import { useProject } from 'hooks/useProject';
import Loading from 'components/molecules/Loading/Loading';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { CoaChangelogContainer } from 'components/organisms/CoaChangelogContainer/CoaChangelogContainer';
import { Icon } from 'antd';

export default function ProjectChangeLog() {
  const { projectId } = useParams();
  const history = useHistory();
  const { loading, project } = useProject(projectId);
  if (loading) return <Loading />;

  return (
    <ProjectHeader project={project}>
      <div className="p-projectChangelog__content">
        <CoaTextButton
          className="p-projectChangelog__goBackButton"
          onClick={() => history.push(`/${projectId}`)}
        >
          <Icon type="arrow-left" />
          Go Back
        </CoaTextButton>
        <TitlePage textTitle="Changelog" textColor="#4C7FF7" />
        <CoaChangelogContainer />
      </div>
    </ProjectHeader>
  );
}
