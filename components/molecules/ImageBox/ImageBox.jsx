import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Col } from 'antd';
import './_style.scss';

const ImageBox = ({ imagePath, imageTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openImage = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <Col>
        <div className="ImgSubWrapper">
          <img
            src={imagePath}
            alt="experience"
            onClick={openImage}
            role="presentation"
          />
        </div>
      </Col>
      {isOpen && (
        <Lightbox
          imageCaption={imageTitle}
          mainSrc={imagePath}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

ImageBox.defaultProps = {
  imagePath: [],
  imageTitle: ''
};

ImageBox.propTypes = {
  imagePath: PropTypes.string,
  imageTitle: PropTypes.string
};

export default ImageBox;
