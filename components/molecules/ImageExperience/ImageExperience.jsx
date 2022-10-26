import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import { Col } from 'antd';
import { photoPropType } from '../../../helpers/proptypes';

const ImageExperience = ({ images, imageTitle }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openImage = index => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="ExpPhotosWrapper">
      {images.map(
        (photo, index) =>
          photo.path && (
            <Col xs={8} lg={9} key={photo.id}>
              <div className="ImgSubWrapper">
                <img
                  src={photo.path}
                  alt="experience"
                  onClick={() => openImage(index)}
                  role="presentation"
                />
              </div>
            </Col>
          )
      )}
      {isOpen && (
        <Lightbox
          imageCaption={imageTitle}
          mainSrc={images[photoIndex].path}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};

ImageExperience.defaultProps = {
  images: [],
  imageTitle: ''
};

ImageExperience.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape(photoPropType)),
  imageTitle: PropTypes.string
};

export default ImageExperience;
