import React from 'react';
import PreviewProject from '../components/organisms/PreviewProject/PreviewProject';
import { EvidenceForm } from '../components/molecules/EvidenceForm/EvidenceForm';

const CreateEvidenceContainer = () => {
  const pathParts = window.location.pathname.split('/');
  const id = pathParts[1];

  return (
    <PreviewProject id={id}>
      <EvidenceForm />
    </PreviewProject>
  );
}

export default CreateEvidenceContainer;
