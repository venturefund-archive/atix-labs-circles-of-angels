import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import CustomButton from '../../../atoms/CustomButton/CustomButton';
import RowMilestones from '../../RowMilestones/RowMilestones';
import { updateTask, deleteTask } from '../../../../api/activityApi';
import {
  updateMilestone,
  deleteMilestone
} from '../../../../api/milestonesApi';
import CreateMilestoneContainer from '../../CreateMilestoneContainer/CreateMilestoneContainer';

const CreateMilestonesStep3 = ({ milestones, createMilestone }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const milestoneRowsProps = {
    milestoneActionType: 'edit',
    // these two functions could be passed down from the container
    onMilestoneDelete: async milestoneId => {
      const response = await deleteMilestone(milestoneId);
      return !response.errors;
    },
    onMilestoneEdit: async milestone => {
      const response = await updateMilestone(milestone.id, milestone);
      return !response.errors;
    },
    showMilestoneDelete: true,
    showMilestoneEdit: true
  };

  const taskRowProps = {
    onTaskDelete: async taskId => {
      const response = await deleteTask(taskId);
      return !response.errors;
    },
    onTaskEdit: async task => {
      const response = await updateTask(task.id, task);
      return !response.errors;
    },
    showTaskDelete: true,
    showTaskEdit: true
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
  createMilestone: PropTypes.func.isRequired
};

export default CreateMilestonesStep3;
