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

