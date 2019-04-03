import React from 'react';
import BlockUpload from '../BlockUpload/BlockUpload';
import WebFormProject from '../WebFormProject/WebFormProject';

import './_style.scss';
import CustomButton from '../../atoms/CustomButton/CustomButton';

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
      <BlockUpload
        subtitle="Project's Card Image"
        text="Lorem ipsum text description"
        name="projectCard"
        typeAccepts="image/*"
        buttonText="Upload Image"
      />
      <BlockUpload
        subtitle="Project's Cover Image"
        text="Lorem ipsum text description"
        name="projectCover"
        typeAccepts="image/*"
        buttonText="Upload Image"
      />
      <BlockUpload
        subtitle="Project's Cover Image"
        text="Lorem ipsum text description"
        name="projectCover"
        typeAccepts=".pdf"
        buttonText="Upload File"
      />
    </div>
  </div>
);

export default Step1;
