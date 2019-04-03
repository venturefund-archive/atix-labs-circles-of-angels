import React from 'react';

import DownloadTemplate from '../DownloadTemplate/DownloadTemplate';
import DragUploadFile from '../DragUploadFile/DragUploadFile';

import './_style.scss';

const Step2 = () => (
  <div className="StepContent">
    <p className="LabelSteps">Step 2</p>
    <h1>Complete Project Milestones</h1>
    <div className="ProjectDataContainer">
      <h3 className="CreateSubtitle">Projects Milestone Data</h3>
      <DownloadTemplate
        subtitle="Project's Milestones Template"
        text="Lorem ipsum text description"
      />
      <DragUploadFile
        change={() => console.log("wfsdf")}
        status={"fd"}
        errors={["df"]}
      />
    </div>
  </div>
);

export default Step2;
