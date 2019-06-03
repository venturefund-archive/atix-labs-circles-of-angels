import React from 'react';
import { Modal, Input, Avatar, message, Form } from 'antd';
import mime from 'mime-types';
import './_style.scss';
import './_steps.scss';
import './_project-detail.scss';
import UploadCardImage from '../components/molecules/UploadCardImage/UploadCardImage';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import FileUploadStatus from '../constants/FileUploadStatus';

const { TextArea } = Input;

class ModalNewExperience extends React.Component {
  state = { visible: false, imageList: [] };

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
      visible: false,
      imageList: []
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handleChange = e => {
    const { form } = this.props;
    this.experience.comment = form.getFieldValue('comment');
  };

  onFileChange = file => {
    const { imageList } = this.state;
    if (file.status === FileUploadStatus.UPLOADING) {
      if (this.checkFileType(file)) {
        imageList.push(file);
      } else {
        message.error(`${file.name} file type is invalid.`);
      }
    } else if (file.status === FileUploadStatus.REMOVED) {
      imageList.splice(imageList.indexOf(file), 1);
    }
    this.setState({ imageList });
    this.experience.photos = imageList;
  };

  checkFileType = file => {
    const fileType = mime.lookup(file.name);
    return fileType.includes('image/');
  };

  getInitials = fullName => {
    if (!fullName) return;
    let initials = fullName.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || '') + (initials.pop() || '')
    ).toUpperCase();
    return initials;
  };

  render() {
    const { visible, imageList } = this.state;
    const { form, user } = this.props;
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
              {this.getInitials(user.username)}
            </Avatar>
            <div>
              <h1 className="ant-modal-title">{user.username}</h1>
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
                <UploadCardImage
                  onChange={this.onFileChange}
                  fileList={imageList}
                />
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
