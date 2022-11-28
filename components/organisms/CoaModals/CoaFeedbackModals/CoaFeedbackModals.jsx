import React from 'react';
import { Icon, Modal } from 'antd';
import './CoaFeedModals.scss';

/* export const ConfirmDeleteModal = ({ title, subtitle, onOk, onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <CoaBaseModal {...{ onOk, onCancel }}>
      <Icon type="delete" />
      <h2>{title}</h2>
      {subtitle}
      {!subtitle && <p>This action cannot be undone</p>}
    </CoaBaseModal>
  );
}; */

export const CoaConfirmDeleteModal = ({ title, subtitle, onOk }) =>
  Modal.confirm({
    onOk,
    title: (
      <div className="coaConfirmDeleteModal__titleContainer">
        <Icon className="coaConfirmDeleteModal__titleContainer__icon" type="delete" />
        <h2 className="coaConfirmDeleteModal__titleContainer__title">{title}</h2>
      </div>
    ),
    content: <p className="coaConfirmDeleteModal__description">{subtitle}</p>,
    icon: null
  });
