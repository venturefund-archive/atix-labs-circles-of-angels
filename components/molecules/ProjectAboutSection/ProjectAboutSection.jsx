import React from 'react';
import './_style.scss';

const ProjectAboutSection = () => (
  <div className="about">
    <div className="project--buttons">
      <a href='/' className="project--btn">
        <img src='/static/images/building.svg' alt="building"/>
        <span>Project Details</span>
      </a>
      <a href='/' className="milestone--btn">
        <img src='/static/images/man.svg' alt='man'/>
        <span>Milestones</span>
      </a>
    </div>
    <div className="content">
      <div className="text">
        <div className="about--text">
          <div className="header">
            <small>01</small>
            <h1>About the Project</h1>
            <div className="border"/>
          </div>
          <p>
                        Having spent a lot of time volunteering for different charities
                        across East Africa since 2008, Jacqueline got inspired by the many
                        kids she has met over the years to launch Shule. The foundation’s
                        ultimate goal is to bring quality education to boys who are denied
                        this fundamental human right. <br/>
            <br/> Many of the children she meets on the streets of Uganda are
                        very intelligent, despite having little to no access to education
                        due to their family’s econimic status. Resulting in their
                        potential often being unfulfilled.
          </p>
        </div>
        <div className="missions">
          <div className="header">
            <small>02</small>
            <h1>Mission and Vision</h1>
            <div className="border"/>
          </div>
          <p>
                        Our mission is to empower families + communities through job
                        creation. Each handwoven Yellow Leaf Hammock is created by an
                        artisan from the hill-tribe communities of rural Thailand.
            <br/>
            <br/>
                        By creating safe, high-wage weaving jobs, we divert families from
                        toxic slash + burn agriculture and end the cycle of debt slavery.
            <br/>
            <br/>
                        Good jobs empower + transform communities for generations.
          </p>
        </div>
      </div>
      <div className="card"></div>
    </div>
  </div>
);

export default ProjectAboutSection;
