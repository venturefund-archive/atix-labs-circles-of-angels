import React, { useState, useEffect } from 'react';
import './coa-milestones-view.scss';
import { message } from 'antd';

import { ROLES_IDS } from 'components/organisms/AssignProjectUsers/constants';
import { createMilestone, deleteMilestone, updateMilestone } from 'api/milestonesApi';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import _ from 'lodash';
import { CoaFormMilestoneModal } from 'components/organisms/CoaMilestones/CoaFormMilestoneModal/CoaFormMilestoneModal';
import { CoaFormActivitiesModal } from 'components/organisms/CoaActivities/CoaFormActivitiesModal/CoaFormActivitiesModal';
import { getUsersByRole } from 'helpers/modules/projectUsers';
import { CoaMilestonesList } from '../CoaMilestonesList/CoaMilestonesList';

export const CoaMilestonesView = ({ project }) => {
  const projectId = project?.id;
  const currency = project?.details?.currency;
  const auditors = getUsersByRole(ROLES_IDS.auditor, project?.users);
  const auditorsProcessed = auditors?.map(auditor => ({
    label: `${auditor?.firstName} ${auditor?.lastName}`,
    value: auditor?.id
  }));

  const initialMilestones = project?.milestones;

  const [isFormMilestoneModalOpen, setIsFormMilestoneModalOpen] = useState(false);
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [currentEditedMilestone, setCurrentEditedMilestone] = useState();

  useEffect(() => {
    setMilestones(initialMilestones);
  }, [initialMilestones]);

  const handleCreateMilestone = async newMilestone => {
    const { data, errors, status } = await createMilestone(projectId, newMilestone);
    if (status !== 201) {
      return message.error(errors);
    }
    setMilestones([...milestones, { ...newMilestone, id: data?.id, activities: [] }]);
    message.success('Milestone created!');
  };

  const handleRemoveMilestone = async milestoneId => {
    const { errors, status } = await deleteMilestone(milestoneId);
    if (status !== 200) {
      return message.error(errors);
    }
    const _milestones = milestones.filter(milestone => milestone?.id !== milestoneId);
    setMilestones(_milestones);
    message.success('Milestone removed!');
  };

  const handleUpdateMilestone = updatedMilestone => {
    /* const  updateMilestone() */

    const _milestones = [...milestones];
    const milestoneToUpdateIndex = _milestones.findIndex(
      milestone => milestone?.id === currentEditedMilestone?.id
    );
    _milestones[milestoneToUpdateIndex] = {
      ..._milestones[milestoneToUpdateIndex],
      ...updatedMilestone
    };
    setMilestones(_milestones);
    setCurrentEditedMilestone(undefined);
    message.success('Milestone updated!');
  };

  const handleEditMilestone = milestone => {
    setIsFormMilestoneModalOpen(true);
    setCurrentEditedMilestone(milestone);
  };

  const addActivity = async newActivity => {
    const data = { id: _.uniqueId() };
    const errors = undefined;
    if (errors) {
      return message.error(errors);
    }
    const _milestones = [...milestones];
    const milestoneToUpdateIndex = _milestones.findIndex(
      milestone => milestone?.id === currentEditedMilestone?.id
    );
    const milestoneFound = _milestones[milestoneToUpdateIndex];
    const activities = milestoneFound?.activities;
    activities.push({ ...newActivity, id: data?.id });

    setMilestones([..._milestones]);
    message.success('Milestone created!');
  };

  const handleRemoveActivity = async ({ activityId, milestone }) => {
    const _milestones = [...milestones];
    const milestoneOwnerIndex = _milestones.findIndex(
      _milestone => _milestone?.id === milestone?.id
    );
    _milestones[milestoneOwnerIndex].activities = _milestones[
      milestoneOwnerIndex
    ]?.activities?.filter(activity => activity?.id !== activityId);

    setMilestones(_milestones);
    message.success('Activity Deleted!');
  };

  return (
    <>
      <div className="o-coaMilestonesContainer">
        <div className="o-coaMilestonesContainer__titleContainer">
          <TitlePage textTitle="Preview and edit milestones" />
          <CoaButton type="primary" onClick={() => setIsFormMilestoneModalOpen(true)}>
            Add new Milestone
          </CoaButton>
        </div>
        <div className="o-coaMilestonesContainer__cards">
          <CoaMilestonesList
            data={milestones}
            currency={currency}
            onRemoveMilestone={handleRemoveMilestone}
            onEditMilestone={handleEditMilestone}
            onCreateActivity={milestone => {
              setCurrentEditedMilestone(milestone);
              setIsCreateActivityModalOpen(true);
            }}
            onRemoveActivity={handleRemoveActivity}
          />
        </div>
      </div>
      <CoaFormMilestoneModal
        visible={isFormMilestoneModalOpen}
        onCancel={() => setIsFormMilestoneModalOpen(false)}
        onSave={currentEditedMilestone ? handleUpdateMilestone : handleCreateMilestone}
        initialData={currentEditedMilestone}
      />
      <CoaFormActivitiesModal
        visible={isCreateActivityModalOpen}
        onCancel={() => setIsCreateActivityModalOpen(false)}
        onSave={addActivity}
        currency={currency}
        auditors={auditorsProcessed}
      />
    </>
  );
};
