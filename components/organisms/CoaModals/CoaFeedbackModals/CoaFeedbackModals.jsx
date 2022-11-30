import React from 'react';
import { Divider, Icon, Modal } from 'antd';
import './coa-feedback-modals.scss';

export const CoaConfirmDeleteModal = ({ title, subtitle, onOk }) =>
  Modal.confirm({
    className: 'o-coaConfirmDeleteModal',
    onOk,
    title: (
      <div className="o-coaConfirmDeleteModal__titleContainer">
        <Icon className="o-coaConfirmDeleteModal__titleContainer__icon" type="delete" />
        <h2 className="o-coaConfirmDeleteModal__titleContainer__title">{title}</h2>
      </div>
    ),
    content: (
      <>
        <p className="o-coaConfirmDeleteModal__description">{subtitle}</p>
        <Divider />
      </>
    ),
    icon: null,
    cancelButtonProps: {
      ghost: true,
      type: 'primary',
      className: 'o-coaConfirmDeleteModal__button --no'
    },
    okButtonProps: {
      className: 'o-coaConfirmDeleteModal__button --ok'
    },
    cancelText: 'No',
    okText: 'Yes',
    centered: true
  });
