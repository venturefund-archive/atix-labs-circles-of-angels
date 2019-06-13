/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { isEmpty } from 'lodash';
import { Carousel } from 'antd';
import { withUser } from '../components/utils/UserContext';
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
          <span>{experience.date}</span>
        </div>
        <h3>{experience.comment}</h3>
      </div>
    </div>
  );
};
const SeccionExperience = ({ experiences, onCreate, user }) => (
  <div className="Experiences">
    <div className="space-between">
      <h1 className="title">Recent Reviews</h1>
      <ModalNewExperience onCreate={onCreate} user={user} />
    </div>
    <div className="grid">
      {!isEmpty(experiences) &&
        experiences.map((experience, i) => (
          <CardExperience experience={experience} key={i} />
        ))}
    </div>
  </div>
);

export default withUser(SeccionExperience);
