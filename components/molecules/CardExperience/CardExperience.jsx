import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Col } from 'antd';
import CustomShowMoreText from '../../atoms/CustomShowMoreText/CustomShowMoreText';
import { experiencePropType } from '../../../helpers/proptypes';
import './_style.scss';

const CardExperience = ({ experience }) => (
  <Col span={8}>
    <Col className="cardExperience" span={24}>
      <CustomShowMoreText lines={3} text={experience.comment} />
      <Col className="ExpPhotosWrapper" gutter={8}>
        {experience.photos &&
          !isEmpty(experience.photos) &&
          experience.photos.map(
            photo =>
              photo.path && (
                <Col span={6} key={photo.id}>
                  <div className="ImgSubWrapper">
                    <img src={photo.path} alt="experience" />
                  </div>
                </Col>
              )
          )}
      </Col>
    </Col>
  </Col>
);

CardExperience.propTypes = {
  experience: PropTypes.shape(experiencePropType).isRequired
};

export default CardExperience;
