/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Modal, message, Tag, Divider, Icon } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';


const Items = () => (
          <div className="EvidenceItem">
          <div className="space-between">
            <Tag color="#4C7FF7">Approved</Tag>
            <div>
             <Icon type="link" style={{ fontSize: '16px', color: '#4C7FF7' }}/> <a href="/">This is a link to the explorer</a>
             </div>
          </div>
          <p>Irure pariatur aliqua et sint magna labore. Irure aliqua et sint irure sit aute officia qui 
          consectetur laborum non quis eiusmod. Aliquip aute consequat magna pariatur nisi. Laborum 
          excepteur sunt tempor eiusmod Lorem. Laboris et elit do duis pariatur magna nisi consequat
          magna commodo cillum nisi qui laboris. Dolore enim ex irure veniam non. Nulla in nulla veniam 
          ut excepteur ut eiusmod sint anim cupidatat.</p>
            <span>14/10/2019 - 13:41PM</span>
         
            <div className="BlockImages">
              <div className="ImageContainer">
                 <img src="./static/images/evidence1.png" alt="evidences" />
              </div>
              <div className="ImageContainer">
                 <img src="./static/images/evidence2.png" alt="evidences" />
              </div>
              <div className="ImageContainer">
                 <img src="./static/images/evidence3.png" alt="evidences" />
              </div>
            </div>
          </div>
)
class ModalEvidences extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="blueLink">
        <a className="blueLink" onClick={this.showModal}>Evidences</a>
        <Modal
          title="Evidences - Name of the task"
          centered
          className="ModalEvidences"
          footer={null}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Items/>
          <Divider/>
             <Items/>
                       <Divider/>
             <Items/>
                       <Divider/>
             <Items/>
                       <Divider/>
             <Items/>
        </Modal>
      </div>
    );
  }
}

export default ModalEvidences;