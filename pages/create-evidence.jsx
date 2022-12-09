import React from 'react';
import { useParams } from 'react-router';
import { EvidenceForm } from '../components/molecules/EvidenceForm/EvidenceForm';
import ProjectHeader from '../components/organisms/ProjectHeader/ProjectHeader';

const CreateEvidenceContainer = () => {
  const { id } = useParams();
  return (
    <ProjectHeader id={id}>
      <EvidenceForm />
    </ProjectHeader>
  )
}

export default CreateEvidenceContainer;
