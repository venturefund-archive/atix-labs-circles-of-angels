import BackgroundLanding from 'components/atoms/BackgroundLanding/BackgroundLanding';
import { SimpleLandingLayout } from 'components/Layouts/SimpleLandingLayout/SimpleLandingLayout';
import ProjectBrowser from 'components/organisms/ProjectBrowser/ProjectBrowser';
import { UserContext } from 'components/utils/UserContext';
import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router';

export default function MyProjects() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const goToProject = project => history.push(`/${project?.projectId}`);

  const myProjects = useRef(user?.projects);

  return (
    <BackgroundLanding>
      <SimpleLandingLayout>
        <ProjectBrowser
          title="My Projects"
          userRole={user && user.role}
          projects={myProjects.current}
          onCardClick={goToProject}
        />
      </SimpleLandingLayout>
    </BackgroundLanding>
  );
}
