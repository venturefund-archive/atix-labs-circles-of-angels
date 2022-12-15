import React from 'react';
import { useParams } from 'react-router';
import { EvidenceForm } from '../components/molecules/EvidenceForm/EvidenceForm';
import ProjectHeader from '../components/organisms/ProjectHeader/ProjectHeader';
import { useProject } from '../hooks/useProject';
import Loading from '../components/molecules/Loading/Loading';

const CreateEvidenceContainer = () => {
    const { id } = useParams();
    const { loading, project } = useProject(id)
    if (loading) return <Loading/>;
    return (
      <ProjectHeader project={project}>
        <EvidenceForm/>
      </ProjectHeader>
    )
}

export default CreateEvidenceContainer;
