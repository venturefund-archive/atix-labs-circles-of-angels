import React, { useState, useEffect } from 'react';
import './coa-milestones-view.scss';
import { message } from 'antd';

import { ROLES_IDS } from 'components/organisms/AssignProjectUsers/constants';
import {
  createMilestone,
  deleteMilestone,
  updateMilestone,
  createActivity,
  deleteActivity
} from 'api/milestonesApi';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { CoaFormMilestoneModal } from 'components/organisms/CoaMilestones/CoaFormMilestoneModal/CoaFormMilestoneModal';
import { CoaFormActivitiesModal } from 'components/organisms/CoaActivities/CoaFormActivitiesModal/CoaFormActivitiesModal';
import { updateActivity } from 'api/activityApi';
import { getUsersByRole } from 'helpers/modules/projectUsers';
import { CoaConfirmDeleteModal } from 'components/organisms/CoaModals/CoaFeedbackModals/CoaFeedbackModals';
import { CoaMilestoneItem } from '../CoaMilestoneItem/CoaMilestoneItem';

export const CoaMilestonesView = ({ project }) => {
  const projectId = project?.id;
  const currency = project?.details?.currency || '';
  const auditors = getUsersByRole(ROLES_IDS.auditor, project?.users);
  const auditorsProcessed = auditors?.map(auditor => ({
    label: `${auditor?.firstName} ${auditor?.lastName}`,
    value: auditor?.id
  }));

  const initialMilestones = project?.milestones;

  const [isFormMilestoneModalOpen, setIsFormMilestoneModalOpen] = useState(false);
  const [isFormActivityModalOpen, setIsFormActivityModalOpen] = useState(false);

  const [milestones, setMilestones] = useState([]);
  const [currentEditedMilestone, setCurrentEditedMilestone] = useState();
  const [currentEditedActivity, setCurrentEditedActivity] = useState();

  useEffect(() => {
    setMilestones(initialMilestones);
  }, [initialMilestones]);

  const handleCreateMilestone = async newMilestone => {
    const { data, errors, status } = await createMilestone(projectId, newMilestone);
    if (status !== 201) {
      return message.error(errors);
    }
    setMilestones([
      ...milestones,
      { ...newMilestone, id: data?.milestoneId, activities: [], budget: '0' }
    ]);
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

  const handleOpenConfirmDeleteMilestoneModal = milestoneId =>
    CoaConfirmDeleteModal({
      onOk: () => handleRemoveMilestone(milestoneId),
      title: 'Do you want to delete this milestone?',
      subtitle: 'This action cannot be undone'
    });

  const handleUpdateMilestone = async updatedMilestone => {
    const { status, errors } = await updateMilestone(currentEditedMilestone?.id, updatedMilestone);

    if (status !== 200) return message.error(errors);

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

  const handleOpenEditMilestone = milestone => {
    setIsFormMilestoneModalOpen(true);
    setCurrentEditedMilestone(milestone);
  };

  const handleOpenEditActivity = ({ activity, milestone }) => {
    setIsFormActivityModalOpen(true);
    setCurrentEditedMilestone(milestone);
    setCurrentEditedActivity(activity);
  };

  const handleCreateActivity = async newActivity => {
    const processedActivity = { ...newActivity, budget: newActivity?.budget || '0' };

    const { errors, data, status } = await createActivity(
      processedActivity,
      currentEditedMilestone?.id
    );

    if (status !== 201) return message.error(errors);

    const _milestones = [...milestones];
    const milestoneToUpdateIndex = _milestones.findIndex(
      milestone => milestone?.id === currentEditedMilestone?.id
    );
    const milestoneFound = _milestones[milestoneToUpdateIndex];
    const activities = milestoneFound?.activities;

    activities.push({
      ...processedActivity,
      id: data?.activityId,
      auditor: { id: processedActivity?.auditor }
    });

    const totalBudget = activities.reduce(
      (curr, next) => parseFloat(curr) + parseFloat(next?.budget),
      0
    );
    milestoneFound.budget = totalBudget;

    setMilestones([..._milestones]);
    message.success('Activity created!');
  };

  const handleRemoveActivity = async ({ activityId, milestone }) => {
    const { errors } = await deleteActivity(activityId);

    if (errors) return message.error(errors);

    const _milestones = [...milestones];
    const milestoneOwnerIndex = _milestones.findIndex(
      _milestone => _milestone?.id === milestone?.id
    );
    const milestoneFound = _milestones[milestoneOwnerIndex];
    milestoneFound.activities = milestoneFound?.activities?.filter(
      activity => activity?.id !== activityId
    );

    const totalBudget = milestoneFound?.activities.reduce(
      (curr, next) => parseFloat(curr) + parseFloat(next?.budget),
      0
    );
    milestoneFound.budget = totalBudget;

    setMilestones(_milestones);
    message.success('Activity Deleted!');
  };

  const handleOpenConfirmDeleteActivityModal = ({ activityId, milestone }) =>
    CoaConfirmDeleteModal({
      onOk: () => handleRemoveActivity({ activityId, milestone }),
      title: 'Do you want to delete this activity?',
      subtitle: 'This action cannot be undone'
    });

  const handleEditActivity = async updatedActivity => {
    const { status, errors } = await updateActivity(currentEditedActivity?.id, updatedActivity);

    if (status !== 200) return message.error(errors);

    const _milestones = [...milestones];
    const milestoneOwnerIndex = _milestones.findIndex(
      _milestone => _milestone?.id === currentEditedMilestone?.id
    );
    const milestoneFound = _milestones[milestoneOwnerIndex];

    const activities = milestoneFound?.activities;
    const activityToUpdateIndex = activities.findIndex(
      activity => activity?.id === currentEditedActivity?.id
    );

    activities[activityToUpdateIndex] = {
      ...activities[activityToUpdateIndex],
      ...updatedActivity,
      auditor: {
        id: updatedActivity.auditor
      }
    };

    const totalBudget = activities.reduce(
      (curr, next) => parseFloat(curr) + parseFloat(next?.budget),
      0
    );
    milestoneFound.budget = totalBudget;

    setMilestones(_milestones);
    setCurrentEditedActivity(undefined);
    setCurrentEditedMilestone(undefined);
    message.success('Activity updated');
  };

  const handleCancelFormMilestoneModal = () => {
    setIsFormMilestoneModalOpen(false);
    setCurrentEditedMilestone(undefined);
  };

  const handleCancelFormActivityModal = () => {
    setIsFormActivityModalOpen(false);
    setCurrentEditedMilestone(undefined);
    setCurrentEditedActivity(undefined);
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
          {milestones.map((milestone, index) => (
            <CoaMilestoneItem
              onRemoveMilestone={() => handleOpenConfirmDeleteMilestoneModal(milestone?.id)}
              onEditMilestone={() => handleOpenEditMilestone(milestone)}
              onCreateActivity={() => {
                setCurrentEditedMilestone(milestone);
                setIsFormActivityModalOpen(true);
              }}
              onEditActivity={activity => handleOpenEditActivity({ milestone, activity })}
              onRemoveActivity={activityId =>
                handleOpenConfirmDeleteActivityModal({ milestone, activityId })
              }
              {...{
                currency,
                milestone
              }}
              {...{ milestoneNumber: index + 1 }}
            />
          ))}
        </div>
      </div>
      <CoaFormMilestoneModal
        visible={isFormMilestoneModalOpen}
        onCancel={handleCancelFormMilestoneModal}
        onSave={currentEditedMilestone ? handleUpdateMilestone : handleCreateMilestone}
        initialData={currentEditedMilestone}
      />
      <CoaFormActivitiesModal
        visible={isFormActivityModalOpen}
        onCancel={handleCancelFormActivityModal}
        onSave={currentEditedActivity ? handleEditActivity : handleCreateActivity}
        currency={currency}
        auditors={auditorsProcessed}
        initialData={currentEditedActivity}
      />
    </>
  );
};
