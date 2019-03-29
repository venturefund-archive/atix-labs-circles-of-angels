import React from 'react';

import UploadImage from '../UploadImage/UploadImage';
import UploadFile from '../UploadFile/UploadFile';
import WebFormProject from '../WebFormProject/WebFormProject';

import './_style.scss';

const Step1 = () => (
  <div className="StepContent">
    <p className="LabelSteps">Step 1</p>
    <h1>Complete Project Detail</h1>
    <div className="ProjectDataContainer">
      <h3 className="CreateSubtitle">Project's Details</h3>
      <WebFormProject />
    </div>
    <div className="ProjectImagesContainer">
      <h3 className="CreateSubtitle">Project's Images</h3>
      <UploadImage
        subtitle="Project's Card Image"
        text="Lorem ipsum text description"
        name="projectCard"
      />
      <UploadImage
        subtitle="Project's Cover Image"
        text="Lorem ipsum text description"
        name="projectCover"
      />
      <UploadFile
        subtitle="Pitch Proposal Document"
        text="Lorem ipsum text description"
        name="projectProposal"
        buttonText="Upload File"
      />
    </div>
  </div>
);

export default Step1;
