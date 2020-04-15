import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Col } from 'antd';
import './_style.scss';

class ImageExperience extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false
    };
  }

  openImage = index => {
    this.setState({ isOpen: true, photoIndex: index });
  };

  render() {
    const { photoIndex, isOpen } = this.state;
    const { images, imageTitle } = this.props;

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
                    onClick={() => this.openImage(index)}
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
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length
              })
            }
          />
        )}
      </div>
    );
  }
}
export default ImageExperience;
