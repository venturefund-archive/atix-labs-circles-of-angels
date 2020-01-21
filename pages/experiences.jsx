/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { isEmpty } from 'lodash';
import { Col, Row } from 'antd';
import CustomShowMoreText from '../components/atoms/CustomShowMoreText/CustomShowMoreText';
import './_style.scss';
import './_steps.scss';
import './_project-detail.scss';
import ModalNewExperience from './new-experiences';

// TODO: everything
const CardExperience = ({ experience }) => {
  const style = isEmpty(experience.photos)
    ? 'cardExperienceText'
    : 'cardExperience';
  return (
    <Col span={8}>
      <Col className="cardExperience" span={24}>
        <CustomShowMoreText
          lines={3}
          text="April visit has been so fun!, These women are amazing with their
          hands, they have reached 10 hammocks per week!
          These women are amazing with their
          hands, they have reached 10 hammocks per week!"
        />
        <Col className="ExpPhotosWrapper" gutter={8}>
          {!isEmpty(experience.photos) &&
            experience.photos.map(
              (photo, i) =>
                photo.image && (
                  <Col span={6} key={i}>
                    <div className="ImgSubWrapper">
                      <img src={photo.image.data} alt="thing" />
                    </div>
                  </Col>
                )
            )}
        </Col>
      </Col>
    </Col>
    // <div className={style}>
    //   {
    //     <Carousel dotPosition="right" autoplay effect="fade">
    //       {!isEmpty(experience.photos) &&
    //         experience.photos.map(
    //           (photo, i) =>
    //             photo.image && (
    //               <div key={i}>
    //                 <img src={photo.image.data} alt="thing" />
    //               </div>
    //             )
    //         )}
    //     </Carousel>
    //   }
    //   <div className="absolute">
    //     <div className="pplRoute">
    //       <p> {experience.user.username}</p>
    //       <span>{experience.date}</span>
    //     </div>
    //     <h3>{experience.comment}</h3>
    //   </div>
    // </div>
  );
};
const SeccionExperience = ({ experiences, onCreate, user }) => (
  <div className="Experiences">
    <Row gutter={12}>
      <Col span={8}>
        <ModalNewExperience onCreate={onCreate} user={user} />
      </Col>
      {!isEmpty(experiences) &&
        experiences.map((experience, i) => (
          <CardExperience experience={experience} key={i} />
        ))}
    </Row>
  </div>
);

export default SeccionExperience;
