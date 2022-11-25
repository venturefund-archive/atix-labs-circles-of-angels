import React from 'react';
import './coa-milestone-item.scss';
import PropTypes from 'prop-types';
import { Collapse, Icon } from 'antd';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { CoaIndicatorsCard } from 'components/organisms/CoaIndicatorsCard/CoaIndicatorsCard';
import { CoaActivitiesList } from 'components/organisms/CoaActivities/CoaActivitiesList/CoaActivitiesList';

export const CoaMilestoneItem = ({
  milestoneNumber,
  currency,
  milestone,
  onRemoveMilestone,
  onEditMilestone,
  onCreateActivity,
  onRemoveActivity
}) => {
  const description = milestone?.description;
  const title = milestone?.title;
  const budget = milestone?.budget;
  const spent = milestone?.spent;

  const { Panel } = Collapse;

  return (
    <CoaIndicatorsCard
      {...{ currency }}
      budget={budget}
      title={`Milestone ${milestoneNumber} - ${title}`}
      entity="Activity"
      onEdit={() => onEditMilestone(milestone)}
      onRemove={() => onRemoveMilestone(milestone?.id)}
      onCreate={() => onCreateActivity(milestone)}
      remaining={budget - spent}
      spent={spent}
      additionalBody={
        <>
          <p className="o-coaMilestoneItem__description">{description}</p>
          <Collapse
            defaultActiveKey={['1']}
            className="o-coaMilestoneItem__collapse"
            bordered={false}
          >
            <Panel header="View Activities" className="o-coaMilestoneItem__collapse__panel">
              <CoaActivitiesList
                data={milestone?.activities}
                {...{ currency }}
                onRemove={onRemoveActivity}
                milestone={milestone}
              />
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
