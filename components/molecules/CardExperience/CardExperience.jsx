import React, { useState }from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Col } from 'antd';
import CustomShowMoreText from '../../atoms/CustomShowMoreText/CustomShowMoreText';
import { experiencePropType } from '../../../helpers/proptypes';
import './_style.scss';

const CardExperience = ({ experience }) => { 
  const [cardClass, setCardClass] = useState('cardExperience')
  return (
    <Col xs={24} lg={8}>
      <Col className={cardClass} span={24}>
        <CustomShowMoreText lines={3} text={experience.comment} updateClass={setCardClass} />
        <Col className="ExpPhotosWrapper" gutter={8}>
          {experience.photos &&
            !isEmpty(experience.photos) &&
            experience.photos.map(
              photo =>
                photo.path && (
                  <Col xs={8} lg={9} key={photo.id}>
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
}
CardExperience.propTypes = {
  experience: PropTypes.shape(experiencePropType).isRequired
};

export default CardExperience;
