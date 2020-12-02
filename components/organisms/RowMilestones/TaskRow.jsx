/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Col, message } from 'antd';
import RowLabel from './RowLabel';
import EditableInfo from './EditableInfo';
import TaskActions from './TaskActions';
import { showModalConfirm } from '../../utils/Modals';
import ModalPasswordRequest from '../ModalPasswordRequest/ModalPasswordRequest';
import { taskPropType, userPropTypes } from '../../../helpers/proptypes';
import { signTransaction } from '../../../helpers/blockchain/wallet';
import CustomFormModal from '../CustomFormModal/CustomFormModal';
import { newTaskEvidenceFormItems } from '../../../helpers/createProjectFormFields';
import {
  uploadEvidenceGetTransaction,
  uploadEvidenceSendTransaction
} from '../../../api/activityApi';

// TODO: define what task fields to show, schema changed
const TaskRow = ({
  task,
  index,
  onDelete,
  onEdit,
  showDelete,
  showEdit,
  taskActionType,
  onOracleAssign,
  canAssignOracle,
  oracles,
  hideOracleColumn,
  allowNewEvidence,
  fetchEvidences,
  fetchMilestones,
  isEditingMilestone
}) => {
  const [editFields, setEditFields] = useState(task);
  const [editing, setEditing] = useState(false);
  const [modalNewEvidenceVisible, setModalNewEvidenceVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [txData, setTxData] = useState();
  const [evidenceData, setEvidenceData] = useState();
  const [evidenceStatus, setEvidenceStatus] = useState();

  const signAndSendTransaction = useCallback(
    async userPassword => {
      const signedTransaction = await signEvidenceTx(txData, userPassword);
      await sendEvidenceTx(evidenceData, evidenceStatus, signedTransaction);
    },
    [txData, evidenceData, evidenceStatus]
  );

  const deleteTask = () =>
    showModalConfirm(
      'Attention!',
      'Are you sure you want to delete this task?',
      () => onDelete(task.id, index)
    );

  const handleEditRow = save => {
    if (!editing) {
      isEditingMilestone(true);
      return setEditing(true);
    }
    isEditingMilestone(false);
    setEditing(false);
    return save === true ? onEdit(editFields, index) : undefined;
  };

  const showPasswordModal = (evidence, tx, status) => {
    setEvidenceData(evidence);
    setTxData(tx);
    setEvidenceStatus(status);
    setModalPasswordVisible(true);
  };

  const hideModalPassword = () => {
    setEvidenceData(undefined);
    setTxData(undefined);
    setEvidenceStatus(undefined);
    setModalPasswordVisible(false);
  };

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
      fetchMilestones();
    }
    message.success('Evidence added successfully!');
  };

  const getEvidenceTx = async (data, status) => {
    const response = await uploadEvidenceGetTransaction(task.id, data, status);

    if (response.errors) {
      throw new Error(response.errors);
    }
    return response.data;
  };

  const signEvidenceTx = async (tx, password) => {
    const { tx: unsignedTx, encryptedWallet } = tx;
    const signedTransaction = await signTransaction(
      encryptedWallet,
      unsignedTx,
      password
    );
    return signedTransaction;
  };

  const sendEvidenceTx = async (evidence, status, signedTransaction) => {
    evidence.set('signedTransaction', signedTransaction);
    const response = await uploadEvidenceSendTransaction(
      task.id,
      evidence,
      status
    );

    if (response.errors) {
      throw new Error(response.errors);
    }
    return response.data;
  };

  const onNewEvidence = async newEvidenceData => {
    const newEvidenceStatus = newEvidenceData.get('status');
    newEvidenceData.delete('status');

    try {
      const tx = await getEvidenceTx(newEvidenceData, newEvidenceStatus);
      showPasswordModal(newEvidenceData, tx, newEvidenceStatus);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onShowModal = () => setModalNewEvidenceVisible(true);

  const mapTaskStatus = isVerified =>
    isVerified
      ? {
          text: 'Verified',
          color: 'green'
        }
      : {
          text: 'Pending',
          color: 'orange'
        };

  return (
    <Col span={24} key={task.id}>
      <Col
        className="gutter-row TableActivities"
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={24}
        lg={{ span: 24 }}
      >
        <div className="header space-between">
          <h3>Activity {index + 1}</h3>
          {(showDelete || showEdit || taskActionType === 'evidence') && (
            <TaskActions
              onDelete={deleteTask}
              onEdit={handleEditRow}
              onNewEvidence={onShowModal}
              showDelete={showDelete}
              showEdit={showEdit}
              isEditing={editing}
              showAddEvidence={allowNewEvidence}
              type={taskActionType}
              taskStatusProps={mapTaskStatus(task.verified)}
              fetchEvidences={() => fetchEvidences(task.id)}
            />
          )}
        </div>
        <div className="flex">
          {!hideOracleColumn && (
            <Col
              className="gutter-row vertical"
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={3}
              lg={{ span: 4 }}
            >
              <RowLabel text="Oracle" />
              <EditableInfo
                value={task.oracle}
                isEditing={canAssignOracle}
                updateValue={oracleId => onOracleAssign(task.id, oracleId)}
                options={
                  oracles &&
                  oracles.map(oracle => ({
                    value: oracle.id,
                    text: `${oracle.firstName} ${oracle.lastName}`
                  }))
                }
                selectable
                placeholder="Assign an oracle"
              />
            </Col>
          )}
          <div className="BorderBox">
            <RowLabel text="Expenditure Category" />
            <EditableInfo
              value={task.category}
              isEditing={editing}
              updateValue={v => setEditFields({ ...editFields, category: v })}
            />
          </div>
          <div className="BorderBox">
            <RowLabel text="Budget" />
            <EditableInfo
              isNumber
              value={editing ? editFields.budget : task.budget}
              isEditing={editing}
              updateValue={v => setEditFields({ ...editFields, budget: v })}
            />
          </div>
          <div className="BorderBox">
            <RowLabel text="Key Personnel" />
            <EditableInfo
              value={task.keyPersonnel}
              isEditing={editing}
              updateValue={v =>
                setEditFields({ ...editFields, keyPersonnel: v })
              }
            />
          </div>
        </div>
        <Col
          className="gutter-row "
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={24}
          lg={{ span: 24 }}
        >
          <RowLabel text="Description" />
          <EditableInfo
            value={task.description}
            isEditing={editing}
            updateValue={v => setEditFields({ ...editFields, description: v })}
          />
        </Col>
        <Col
          className="gutter-row "
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={24}
          lg={{ span: 24 }}
        >
          <RowLabel text="Review Criterion" />
          <EditableInfo
            value={task.reviewCriteria}
            isEditing={editing}
            updateValue={v =>
              setEditFields({ ...editFields, reviewCriteria: v })
            }
          />
        </Col>
      </Col>

      <CustomFormModal
        title="Add new evidence"
        formItems={newTaskEvidenceFormItems}
        visible={modalNewEvidenceVisible}
        onConfirm={onNewEvidence}
        onClose={() => setModalNewEvidenceVisible(false)}
      />
      <ModalPasswordRequest
        visible={modalPasswordVisible}
        onConfirm={inputPasswordHandler}
        onClose={hideModalPassword}
      />
    </Col>
  );
};

TaskRow.defaultProps = {
  allowNewEvidence: false,
  fetchEvidences: () => [],
  fetchMilestones: () => []
};

TaskRow.propTypes = {
  oracles: PropTypes.arrayOf(PropTypes.shape(userPropTypes)).isRequired,
  task: PropTypes.shape(taskPropType).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onOracleAssign: PropTypes.func.isRequired,
  canAssignOracle: PropTypes.bool.isRequired,
  showDelete: PropTypes.bool.isRequired,
  showEdit: PropTypes.bool.isRequired,
  taskActionType: PropTypes.oneOf(['evidence', 'edit', 'none']).isRequired,
  hideOracleColumn: PropTypes.bool.isRequired,
  allowNewEvidence: PropTypes.bool,
  fetchEvidences: PropTypes.func,
  fetchMilestones: PropTypes.func,
  isEditingMilestone: PropTypes.func.isRequired
};

export default TaskRow;
