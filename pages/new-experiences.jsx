import React from 'react';
import { Button, Modal, Input, Upload, message, Avatar } from 'antd';
import './_style.scss';
import './_steps.scss';
import './_project-detail.scss';
import UploadCardImage from '../components/molecules/UploadCardImage/UploadCardImage';
import CustomButton from '../components/atoms/CustomButton/CustomButton';

const { TextArea } = Input;

class ModalNewExperience extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <CustomButton
          theme="Primary"
          buttonText="Write a Review"
          onClick={this.showModal}
        />
        <Modal
          className="ModalNewExperience"
          title="Review"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <CustomButton
              theme="Primary"
              key="back"
              buttonText="Post"
              onClick={this.handleCancel}
            />
          ]}
        >
          <div className="pplRoute flex">
            <Avatar style={{ color: '#0083E3', backgroundColor: '#95d2ff' }}>
              SJ
            </Avatar>
            <div>
              <h1 className="ant-modal-title"> Simon Joseph</h1>
              <p>
                Your experience will be posted publicly in the project details
              </p>
            </div>
          </div>
          <TextArea placeholder="Share your experience here" rows={5} />
          <UploadCardImage />
        </Modal>
      </div>
    );
  }
}

export default ModalNewExperience;
