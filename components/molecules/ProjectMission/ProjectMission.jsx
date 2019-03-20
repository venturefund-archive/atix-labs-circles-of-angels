import React from "react";
import "./_style.scss";

const ProjectMission = ({ mission, terms }) => (

  <div className="ProjectMission">
    <h1>Our Mission</h1>
    <p>{mission}</p>
    <hr className="Separator" />
    <h1>Problem Addressed</h1>
    <p>{terms}</p>
  </div>
);

export default ProjectMission;
