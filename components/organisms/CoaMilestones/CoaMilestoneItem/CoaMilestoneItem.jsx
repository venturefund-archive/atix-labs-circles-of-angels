import React from 'react';
import './coa-milestone-item.scss';
import PropTypes from 'prop-types';
import { Collapse, Icon } from 'antd';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { CoaIndicatorsCard } from 'components/organisms/CoaIndicatorsCard/CoaIndicatorsCard';
import { CoaActivityItem } from 'components/organisms/CoaActivities/CoaActivityItem/CoaActivityItem';

export const CoaMilestoneItem = ({
  milestoneNumber,
  currency,
  milestone,
  onRemoveMilestone,
  onEditMilestone,
  onCreateActivity,
  onRemoveActivity,
  onEditActivity
}) => {
  const description = milestone?.description;
  const title = milestone?.title;
  const budget = milestone?.budget;
  const spent = milestone?.spent || 0;
  const remaining = budget - spent;

  const { Panel } = Collapse;

  return (
    <CoaIndicatorsCard
      {...{ currency }}
      budget={budget}
      title={`Milestone ${milestoneNumber} - ${title}`}
      entity="Activity"
      onEdit={onEditMilestone}
      onRemove={onRemoveMilestone}
      onCreate={onCreateActivity}
      remaining={remaining}
      spent={spent}
      className="o-coaMilestoneItem__card"
      additionalBody={
        <>
          <p className="o-coaMilestoneItem__description">{description}</p>
          <Collapse
            defaultActiveKey={['1']}
            className="o-coaMilestoneItem__collapse"
            bordered={false}
          >
            <Panel header="View Activities" className="o-coaMilestoneItem__collapse__panel">
              {milestone?.activities.map((activity, index) => (
                <CoaActivityItem
                  onRemove={() => onRemoveActivity(activity?.id)}
                  onEdit={() => onEditActivity(activity)}
                  {...{ milestone, currency, activity }}
                  {...{ activityNumber: index + 1 }}
                />
              ))}
            </Panel>
          </Collapse>
          <CoaTextButton
            className="o-coaMilestoneItem__addActivityButton"
            type="dashed"
            onClick={() => onCreateActivity(milestone)}
          >
            <Icon type="plus" /> Add Activity
          </CoaTextButton>
        </>
      }
    />
  );
};

CoaMilestoneItem.defaultProps = {};

CoaMilestoneItem.propTypes = {};
