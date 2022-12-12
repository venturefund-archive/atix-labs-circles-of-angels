import React from 'react';
import { useParams } from 'react-router';
import ProjectHeader from '../components/organisms/ProjectHeader/ProjectHeader';
import Evidences from '../components/organisms/Evidences/Evidences';

const EvidencesContainer = () => {
    const { id } = useParams();
    return (
      <ProjectHeader id={id}>
        <Evidences />
      </ProjectHeader>
    )
}

export default EvidencesContainer;