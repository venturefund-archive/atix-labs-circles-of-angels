/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { Table, Tag, Col, message, Button, Row } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import transferStatusesMap from '../../../model/transferStatusesMap';
import TransferStatuses from '../../../constants/TransferStatuses';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import CustomFormModal from '../CustomFormModal/CustomFormModal';
import { newTransferClaimFormItems } from '../../../helpers/createProjectFormFields';
import {
  addTransferClaimSendTransaction,
  addTransferClaimGetTransaction
} from '../../../api/transferApi';
import ModalPasswordRequest from '../ModalPasswordRequest/ModalPasswordRequest';
import { signTransaction } from '../../../helpers/blockchain/wallet';

const TableAdminTransfers = ({ projectId, getTransfers }) => {
  const [transfers, setTransfers] = useState([]);
  const [modalRejectVisible, setModalRejectVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [transferSelected, setTransferSelected] = useState(undefined);
  const [txData, setTxData] = useState();
  const [claimData, setClaimData] = useState({});
  const [claimApproved, setClaimApproved] = useState();

  const signAndSendTransaction = useCallback(
    async userPassword => {
      const signedTransaction = await signClaimTx(txData, userPassword);
      await sendClaimTx(claimData, claimApproved, signedTransaction);
    },
    [txData, claimData, claimApproved]
  );
  const transferStatusTag = (status, rejectionReason) => {
    const transferStatus = rejectionReason
      ? transferStatusesMap.rejected
      : transferStatusesMap[status];
    return (
      <Tag color={transferStatus.color} key={status}>
        {transferStatus.name}
      </Tag>
    );
  };
  const columns = [
    {
      title: 'Transfer Id',
      dataIndex: 'transferId',
      key: 'transferId'
    },
    {
      title: 'Sender',
      key: 'sender',
      render: ({ sender }) => (
        <span>{`${sender.firstName} ${sender.lastName}`}</span>
      )
    },
    {
      title: 'Destination Account',
      dataIndex: 'destinationAccount',
      key: 'destinationAccount'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency'
    },
    {
      title: 'Receipt',
      dataIndex: 'receiptPath',
      key: 'receiptPath',
      // TODO check how we will handle this
      render: receipt => (
        <Button
          type="link"
          href={receipt}
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </Button>
      )
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status, { rejectionReason }) => {
        if (!status) return;
        return <span>{transferStatusTag(status, rejectionReason)}</span>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      // render: actions => (
      //   <button className="reintentarBtn">
      //     <UndoOutlined /> Reintentar
      //   </button>
      // )
      render: ({ id, status }) => {
        if (status !== TransferStatuses.PENDING) return;
        return (
          <Row>
            <Col span={12}>
              <CustomButton
                theme="Primary"
                key="back"
                buttonText="Approve"
                onClick={() => onApprovedTransfer(id)}
              />
            </Col>
            <Col span={12}>
              <CustomButton
                theme="Sencondary"
                key="back"
                buttonText="Reject"
                onClick={() => setTransferSelected(id)}
              />
            </Col>
          </Row>
        );
      }
    }
  ];

  const fetchTransfers = useCallback(async () => {
    const data = await getTransfers(projectId);
    setTransfers(data);
  });

  const inputPasswordHandler = async data => {
    // TODO: add support for mnemonic
    const password = data.get('password');
    try {
      await signAndSendTransaction(password);
    } catch (error) {
      message.error(error.message);
      return;
    } finally {
      hideModalPassword();
      window.location.reload();
    }
    message.success('Transfer updated successfully!');
  };

  const getClaimTx = async (transferId, approved) => {
    const response = await addTransferClaimGetTransaction(transferId, approved);

    if (response.errors) {
      throw new Error(response.errors);
    }
    return response.data;
  };

  const signClaimTx = async (tx, password) => {
    const { tx: unsignedTx, encryptedWallet } = tx;
    const signedTransaction = await signTransaction(
      encryptedWallet,
      unsignedTx,
      password
    );
    return signedTransaction;
  };

  const sendClaimTx = async (data, approved, signedTransaction) => {
    const body = { ...data, signedTransaction };
    delete body.transferId;
    const response = await addTransferClaimSendTransaction(
      data.transferId,
      approved,
      body
    );

    if (response.errors) {
      throw new Error(response.errors);
    }
    return response.data;
  };

  const onApprovedTransfer = async transferId => {
    try {
      const tx = await getClaimTx(transferId, true);
      showPasswordModal(tx, true, { transferId });
    } catch (error) {
      message.error(error.message);
    }
  };

  const onRejectTransfer = async data => {
    if (!transferSelected) return;

    const formData = {};
    data.forEach((value, key) => {
      formData[key] = value;
    });

    try {
      const tx = await getClaimTx(transferSelected, false);
      showPasswordModal(tx, false, {
        transferId: transferSelected,
        ...formData
      });
    } catch (error) {
      message.error(error.message);
    }
  };

  const showPasswordModal = (tx, approved, data) => {
    setClaimData(data);
    setClaimApproved(approved);
    setTxData(tx);
    setModalPasswordVisible(true);
  };

  const hideModalPassword = () => {
    setClaimData({});
    setClaimApproved(undefined);
    setTxData(undefined);
    setModalPasswordVisible(false);
    setTransferSelected(undefined);
    setModalRejectVisible(false);
  };

  const onShowRejectModal = () => setModalRejectVisible(true);

  useEffect(() => {
    fetchTransfers();
  }, []);

  useEffect(() => {
    if (!transferSelected) return;
    onShowRejectModal();
  }, [transferSelected]);

  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={transfers}
        size="middle"
        className="TableAdmin"
        pagination={false}
        scroll={{ x: 1 }}
      />
      <CustomFormModal
        title="Reject transfer"
        formItems={newTransferClaimFormItems}
        visible={modalRejectVisible}
        onConfirm={onRejectTransfer}
        onClose={() => setModalRejectVisible(false)}
      />
      <ModalPasswordRequest
        onConfirm={inputPasswordHandler}
        onClose={hideModalPassword}
        visible={modalPasswordVisible}
      />
    </Fragment>
  );
};

export default TableAdminTransfers;

TableAdminTransfers.propTypes = {
  projectId: PropTypes.number.isRequired,
  getTransfers: PropTypes.func.isRequired
};
