/**
 * COA PUBLIC LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import { Modal } from 'antd';

export const showModalError = (title, content) => {
  Modal.error({
    title,
    content
  });
};

export const showModalSuccess = (title, content) => {
  Modal.success({
    title,
    content
  });
};

export const showModalConfirm = (title, content, onOk, onCancel) => {
  Modal.confirm({
    title,
    content,
    onOk,
    onCancel,
    okText: 'Ok',
    cancelText: 'Cancel'
  });
};
