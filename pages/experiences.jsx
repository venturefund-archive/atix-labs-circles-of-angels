import React from 'react';
import { Button, Modal, Form, Input, Radio, Carousel } from 'antd';
import './_style.scss';
import './_steps.scss';
import './_project-detail.scss';
import ModalNewExperience from './new-experiences';

const CardExperience = () => (
  <div className="cardExperience">
    <Carousel dotPosition="right" autoplay effect="fade">
      <div>
        <img src="/static/images/donate.jpeg" alt="thing" />
      </div>
      <div>
        <img src="/static/images/donate2.jpeg" alt="thing" />
      </div>
      <div>
        <img src="/static/images/donate3.jpeg" alt="thing" />
      </div>
    </Carousel>
    <div className="absolute">
      <div className="pplRoute">
        <p> Simon Joseph</p>
        <span> 3 days ago</span>
      </div>
      <h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet
        magna at ex ullamcorper sollicitudin id ut sapien
      </h3>
    </div>
  </div>
);
const CardExperienceText = () => (
  <div className="cardExperienceText">
    <div className="absolute">
      <div className="pplRoute">
        <p> Simon Joseph</p>
        <span> 3 days ago</span>
      </div>
      <h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet
        magna at ex ullamcorper sollicitudin id ut sapien. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Morbi sit amet magna at ex
        ullamcorper sollicitudin id ut sapien
      </h3>
    </div>
  </div>
);
const SeccionExperience = () => (
  <div className="Experiences">
    <div className="space-between">
      <h1 className="title">Recent Reviews</h1>
      <ModalNewExperience />
    </div>
    <div className="grid">
      <CardExperience />
      <CardExperienceText />
      <CardExperience />
      <CardExperience />
    </div>
  </div>
);

export default SeccionExperience;
