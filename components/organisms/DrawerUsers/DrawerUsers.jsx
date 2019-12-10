import React, { Fragment } from 'react';
import { Col, Breadcrumb, Row, Drawer, Button } from 'antd';
import './_style.scss';
import CustomButton from '../../atoms/CustomButton/CustomButton';

class DrawerUsers extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <CustomButton
          buttonText="View All"
          theme="Secondary"
          onClick={this.showDrawer}
        />
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

export default DrawerUsers;
