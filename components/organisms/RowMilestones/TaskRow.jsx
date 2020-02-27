import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, message } from 'antd';
import RowLabel from './RowLabel';
import EditableInfo from './EditableInfo';
import TaskActions from './TaskActions';
import { showModalConfirm } from '../../utils/Modals';
import { taskPropType, userPropTypes } from '../../../helpers/proptypes';
import CustomFormModal from '../CustomFormModal/CustomFormModal';
import { newTaskEvidenceFormItems } from '../../../helpers/createProjectFormFields';
import { uploadEvidence } from '../../../api/activityApi';

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
  allowNewEvidence
}) => {
  const [editFields, setEditFields] = useState(task);
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(false);

  const deleteTask = () =>
    showModalConfirm(
      'Attention!',
      'Are you sure you want to delete this task?',
      () => onDelete(task.id, index)
    );

  const handleEditRow = save => {
    if (!editing) return setEditing(true);
    setEditing(false);
    return save === true ? onEdit(editFields, index) : undefined;
  };

  const onNewEvidence = async data => {
    const status = data.get('status');
    data.delete('status');

    const response = await uploadEvidence(task.id, data, status);

    if (response.errors) {
      message.error(response.errors);
      return;
    }

    message.success('Evidence added successfully!');
  };

  const onShowModal = () => setVisible(true);

  return (
    <Col span={24} key={task.id}>
      <Col
        className="gutter-row TableActivities"
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={24}
        lg={{ span: 24 }}
      >
        <div className="header space-between" >
          <h3>Activity {index}</h3>
                {(showDelete || showEdit || allowNewEvidence) && (
        <TaskActions
          onDelete={deleteTask}
          onEdit={handleEditRow}
          onNewEvidence={onShowModal}
          showDelete={showDelete}
          showEdit={showEdit}
          isEditing={editing}
          showAddEvidence={allowNewEvidence}
          type={taskActionType}
        />
      )}
        </div>
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
        <Col
          className="gutter-row "
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={24}
          lg={{ span: 24 }}
        >
          <RowLabel text="Task" />
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
          <RowLabel text="Social Impacts Targets" />
          <EditableInfo
            value={task.impact}
            isEditing={editing}
            updateValue={v => setEditFields({ ...editFields, impact: v })}
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
        visible={visible}
        onConfirm={onNewEvidence}
        onClose={() => setVisible(false)}
      />
    </Col>
  );
};

TaskRow.defaultProps = {
  allowNewEvidence: false
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
  allowNewEvidence: PropTypes.bool
};

export default TaskRow;
