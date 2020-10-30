import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Col } from 'antd';
import { experiencePropType } from '../../../helpers/proptypes';
import ImageExperience from '../ImageExperience/ImageExperience';
import CustomExpandableParagraph from '../../atoms/CustomExpandableParagraph/CustomExpandableParagraph';
import './_style.scss';

const CardExperience = ({ experience }) => {
  return (
    <Col xs={24} lg={8}>
      <Col className="cardExperience" span={24}>
        <CustomExpandableParagraph text={experience.comment} lines={3} />
        <Col className="ExpPhotosWrapper" gutter={8}>
          {experience.photos && !isEmpty(experience.photos) && (
            <ImageExperience
              images={experience.photos}
              imageTitle={experience.comment}
            />
          )}
        </Col>
      </Col>
    </Col>
  );
};
CardExperience.propTypes = {
  experience: PropTypes.shape(experiencePropType).isRequired
};

export default CardExperience;
