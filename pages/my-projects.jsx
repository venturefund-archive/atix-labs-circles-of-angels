import BackgroundLanding from 'components/atoms/BackgroundLanding/BackgroundLanding';
import { SimpleLandingLayout } from 'components/Layouts/SimpleLandingLayout/SimpleLandingLayout';
import ProjectBrowser from 'components/organisms/ProjectBrowser/ProjectBrowser';
import { UserContext } from 'components/utils/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export default function MyProjects() {
  const [myProjects, setMyProjects] = useState([]);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const goToProject = project => history.push(`/${project?.id}`);
  useEffect(() => {
    const fetchMyProjects = async () => {
      /* const myProjects = await getMyProjects();
      setProjects(myProjects); */
    };

    fetchMyProjects();
  }, []);
  return (
    <BackgroundLanding>
      <SimpleLandingLayout>
        <ProjectBrowser
          title="My Projects"
          userRole={user && user.role}
          projects={myProjects}
          onCardClick={goToProject}
        />
      </SimpleLandingLayout>
    </BackgroundLanding>
  );
}
