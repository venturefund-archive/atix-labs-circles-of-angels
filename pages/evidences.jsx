import React, { useContext } from 'react';
import { useParams } from 'react-router';
import ProjectHeader from '../components/organisms/ProjectHeader/ProjectHeader';
// eslint-disable-next-line import/no-named-as-default
import Evidences from '../components/organisms/Evidences/Evidences';
import { useProject } from '../hooks/useProject';
import Loading from '../components/molecules/Loading/Loading';
import { EvidenceContext } from '../components/utils/EvidenceContext';

const EvidencesContainer = () => {
    const { id } = useParams();
    const { loading, project } = useProject(id);
    const { message } = useContext(EvidenceContext)
    if (loading) return <Loading />;


    return (
      <ProjectHeader message={message} project={project}>
        <Evidences project={project} />
      </ProjectHeader>
    )
}

export default EvidencesContainer;