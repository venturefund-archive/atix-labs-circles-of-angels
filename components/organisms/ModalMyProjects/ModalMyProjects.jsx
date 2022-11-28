import React from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import { WarningIcon } from '../../atoms/WarningIcon/WarningIcon';
import './_style.scss';

const ModalMyProjects = ({ isVisible, onClick }) => (
  <Modal visible={isVisible} onOk={onClick} closable={false} footer={null}>
    <div className="WrapperModalMyProjects">
      <div>
        <WarningIcon/>
      </div>
      <spin className="warningTitle">Warning</spin>
      <p className="paragraph">
        The current version of the aplication is designed
      </p>
      <p className="paragraph">
       for desktop devices only.
      </p>
      <p className="paragraph">Please use your computer to access the platform.</p>
      <div>
        <Button key="submit" type="primary" onClick={onClick}>
          <span className="continueText">Continue anyway</span>
        </Button>
      </div>
    </div>
  </Modal>
);

export default ModalMyProjects;

ModalMyProjects.defaultProps = {
  isVisible: false
};
ModalMyProjects.propTypes = {
  isVisible: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};
