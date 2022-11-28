import React from 'react';
import { Icon, Modal } from 'antd';
import './CoaFeedModals.scss';

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
