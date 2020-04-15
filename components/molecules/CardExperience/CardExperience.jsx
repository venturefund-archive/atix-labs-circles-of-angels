import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Col } from 'antd';
import CustomShowMoreText from '../../atoms/CustomShowMoreText/CustomShowMoreText';
import { experiencePropType } from '../../../helpers/proptypes';
import ImageExperience from '../ImageExperience/ImageExperience';
import './_style.scss';

const CardExperience = ({ experience }) => {
  const [cardClass, setCardClass] = useState('cardExperience');
  return (
    <Col xs={24} lg={8}>
      <Col className={cardClass} span={24}>
        <CustomShowMoreText
          lines={3}
          text={experience.comment}
          updateClass={setCardClass}
        />
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
