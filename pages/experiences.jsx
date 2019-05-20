import React from 'react';
import { isEmpty } from 'lodash';
import { Carousel } from 'antd';
import './_style.scss';
import './_steps.scss';
import './_project-detail.scss';
import ModalNewExperience from './new-experiences';

const CardExperience = ({ experience }) => {
  const style = isEmpty(experience.photos)
    ? 'cardExperienceText'
    : 'cardExperience';
  return (
    <div className={style}>
      {
        <Carousel dotPosition="right" autoplay effect="fade">
          {!isEmpty(experience.photos) &&
            experience.photos.map(
              (photo, i) =>
                photo.image && (
                  <div key={i}>
                    <img src={photo.image.data} alt="thing" />
                  </div>
                )
            )}
        </Carousel>
      }
      <div className="absolute">
        <div className="pplRoute">
          <p> {experience.user.username}</p>
          <span> 3 days ago</span>
        </div>
        <h3>{experience.comment}</h3>
      </div>
    </div>
  );
};
const SeccionExperience = ({ experiences, onCreate }) => (
  <div className="Experiences">
    <div className="space-between">
      <h1 className="title">Recent Reviews</h1>
      <ModalNewExperience onCreate={onCreate} />
    </div>
    <div className="grid">
      {!isEmpty(experiences) &&
        experiences.map((experience, i) => (
          <CardExperience experience={experience} key={i} />
        ))}
    </div>
  </div>
);

export default SeccionExperience;
