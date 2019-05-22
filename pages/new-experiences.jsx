import React from 'react';
import { Button, Modal, Input, Upload, message, Avatar, Form } from 'antd';
import './_style.scss';
import './_steps.scss';
import './_project-detail.scss';
import UploadCardImage from '../components/molecules/UploadCardImage/UploadCardImage';
import CustomButton from '../components/atoms/CustomButton/CustomButton';

const { TextArea } = Input;

class ModalNewExperience extends React.Component {
  state = { visible: false };
  experience = {
    comment: '',
    photos: []
  };

  showModal = () => {
    const { form } = this.props;
    form.setFieldsValue({ comment: this.experience.comment });
    this.setState({
      visible: true
    });
  };

  handleOk = async e => {
    const { onCreate } = this.props;
    await onCreate(this.experience);
    this.experience = {
      comment: '',
      photos: []
    };
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

  handleChange = e => {
    const { form } = this.props;
    this.experience.comment = form.getFieldValue('comment');
  };

  onFileChange = fileList => {
    this.experience.photos = fileList;
  };

  render() {
    const { visible } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
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
              onClick={this.handleOk}
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
          <Form onChange={this.handleChange}>
            <Form.Item>
              {getFieldDecorator('comment', {})(
                <TextArea placeholder="Share your experience here" rows={5} />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('photos', {})(
                <UploadCardImage onChange={this.onFileChange} />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create({ name: 'CreateExperienceForm' })(
  ModalNewExperience
);
