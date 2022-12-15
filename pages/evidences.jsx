import React from 'react';
import { useParams } from 'react-router';
import ProjectHeader from '../components/organisms/ProjectHeader/ProjectHeader';
// eslint-disable-next-line import/no-named-as-default
import Evidences from '../components/organisms/Evidences/Evidences';
import { useProject } from '../hooks/useProject';
import Loading from '../components/molecules/Loading/Loading';

const EvidencesContainer = () => {
    const { id } = useParams();
    const { loading, project } = useProject(id)
    if (loading) return <Loading />;


    return (
      <ProjectHeader project={project}>
        <Evidences project={project} />
      </ProjectHeader>
    )
}

export default EvidencesContainer;