import React from "react";
import "./_style.scss";

const ProjectMission = ({ mission, terms }) => (

  <div className="ProjectMission">
    <div className="block">
    <h1 className="title">Our Mission</h1>
    <p>{mission}</p>
    </div>
    <div className="block">
    <h1 className="title">Problem Addressed</h1>
      <p>{terms}</p>
    </div>
  </div>
);

export default ProjectMission;
