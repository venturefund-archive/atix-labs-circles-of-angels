import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import CustomButton from '../../../atoms/CustomButton/CustomButton';
import RowMilestones from '../../RowMilestones/RowMilestones';
import CreateMilestoneContainer from '../../CreateMilestoneContainer/CreateMilestoneContainer';

const CreateMilestonesStep3 = ({
  milestones,
  createMilestone,
  editMilestone,
  deleteMilestone,
  createTask,
  editTask,
  deleteTask
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const milestoneRowsProps = {
    milestoneActionType: 'edit',
    onMilestoneDelete: milestoneId => deleteMilestone(milestoneId),
    onMilestoneEdit: milestone => editMilestone(milestone.id, milestone),
    onTaskCreate: (milestoneId, taskData) => createTask(milestoneId, taskData),
    showMilestoneDelete: true,
    showMilestoneEdit: true,
    showCreateTask: true
  };

  const taskRowProps = {
    onTaskDelete: taskId => deleteTask(taskId),
    onTaskEdit: task => editTask(task.id, task),
    showTaskDelete: true,
    showTaskEdit: true,
    showTaskAddEvidence: false,
    taskActionType: 'edit'
  };

  return (
    <div className="Step3">
      <Row type="flex" justify="space-around" align="top">
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={6}
          lg={{ span: 12, offset: 0 }}
        >
          <TitlePage textTitle="Preview and edit Milestones" />
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={6}
          lg={{ span: 3, offset: 9 }}
        >
          <CustomButton
            buttonText="+ New Milestone"
            theme="Alternative"
            onClick={() => setModalVisible(true)}
          />
          <CreateMilestoneContainer
            visibility={modalVisible}
            setVisibility={setModalVisible}
            createMilestone={createMilestone}
          />
        </Col>
      </Row>
      <RowMilestones
        milestones={milestones}
        {...milestoneRowsProps}
        {...taskRowProps}
      />
    </div>
  );
};

CreateMilestonesStep3.defaultProps = {
  milestones: []
};

CreateMilestonesStep3.propTypes = {
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      quarter: PropTypes.string,
      tasks: PropTypes.arrayOf(
        PropTypes.shape({
          taskHash: PropTypes.string,
          description: PropTypes.string,
          reviewCriteria: PropTypes.string,
          category: PropTypes.string,
          keyPersonnel: PropTypes.string,
          budget: PropTypes.string
        })
      )
    })
  ),
  createMilestone: PropTypes.func.isRequired,
  editMilestone: PropTypes.func.isRequired,
  deleteMilestone: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};

export default CreateMilestonesStep3;
