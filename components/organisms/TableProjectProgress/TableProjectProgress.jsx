/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Progress, Button } from 'antd';
import MilestoneActivityStatusMap from '../../../model/milestoneActivityStatusMap';
import MilestoneActivityStatus from '../../../constants/MilestoneActivityStatus';
import { claimMilestoneStatus } from '../../../constants/constants';
import MilestoneBudgetStatusMap from '../../../model/milestoneBudgetStatusMap';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_tablestyle.scss';

const TableProjectProgress = ({
  dataSource,
  projectId,
  filters,
  isSocialEntrepreneur,
  onBudgetStatusChange,
  projectConfirmedOnBlockchain
}) => {
  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      fixed: 'left'
    },
    {
      title: 'Quarter',
      width: 100,
      dataIndex: 'quarter',
      key: 'quarter'
    },
    { title: 'Tasks', dataIndex: 'tasks', key: '1' },
    { title: 'Social Impact Targets', dataIndex: 'impact', key: '2' },
    { title: 'Review Criterion', dataIndex: 'impactCriterion', key: '3' },
    { title: 'Expenditure Category', dataIndex: 'category', key: '5' },
    { title: 'Key Personnel Responsible', dataIndex: 'keyPersonnel', key: '6' },
    { title: 'Budget needed', dataIndex: 'budget', key: '7' },

    {
      title: 'Oracle',
      dataIndex: 'oracle',
      key: 'oracle',
      fixed: 'right',
      filters: filters.oracles,
      onFilter: (value, record) =>
        record.oracle &&
        record.oracle.username &&
        record.oracle.username.indexOf(value) === 0,
      render: oracle =>
        oracle ? <span key={oracle.id}>{oracle.username}</span> : ''
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      fixed: 'right',
      render: (rawStatus, record) => {
        const activityStatus = MilestoneActivityStatusMap[rawStatus];
        return record.type !== 'Milestone' ? (
          <span key={activityStatus.name}>
            <Tag color={activityStatus.color}>
              {activityStatus.name.toUpperCase()}
            </Tag>
          </span>
        ) : (
          <div className="milestoneStatus">
            {record.activities.length === record.completedActivities ? (
              <Tag
                color={
                  MilestoneActivityStatusMap[MilestoneActivityStatus.COMPLETED]
                    .color
                }
              >
                {MilestoneActivityStatusMap[
                  MilestoneActivityStatus.COMPLETED
                ].name.toUpperCase()}
              </Tag>
            ) : (
              <Progress
                percent={
                  (record.completedActivities * 100) / record.activities.length
                }
                size="small"
              />
            )}
          </div>
        );
      }
    },
    {
      title: 'Funding Status',
      key: 'fundingstatus',
      dataIndex: 'budgetStatus',
      fixed: 'right',
      render: (value, record) =>
        record.type === 'Milestone' && (
          <div className="milestoneStatus">
            <Tag color={MilestoneBudgetStatusMap[value.id].color}>
              {MilestoneBudgetStatusMap[value.id].name.toUpperCase()}
            </Tag>
          </div>
        )
    }
  ];

  if (projectConfirmedOnBlockchain) {
    columns.push({
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (text, record) =>
        record.type !== 'Milestone' ? (
          <span key={record.id}>
            <Button
              type="link"
              onClick={() => {
                // eslint-disable-next-line no-undef
                Routing.toProjectEvidence({
                  activityId: record.id,
                  projectId
                });
              }}
            >
              Evidence
            </Button>
          </span>
        ) : (
          record.budgetStatus.id === claimMilestoneStatus.CLAIMABLE &&
          isSocialEntrepreneur && (
            <CustomButton
              buttonText="CLAIM"
              theme="Primary"
              onClick={() =>
                onBudgetStatusChange(record.id, claimMilestoneStatus.CLAIMED)
              }
            />
          )
        )
    });
  }

  return (
    <Table
      title={() => <div className="space-between">Milestones</div>}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 1300 }}
      filters={filters}
    />
  );
};
export default TableProjectProgress;

TableProjectProgress.propTypes = {
  dataSource: PropTypes.element.isRequired,
  projectId: PropTypes.number.isRequired,
  filters: PropTypes.element.isRequired,
  isSocialEntrepreneur: PropTypes.bool.isRequired,
  onBudgetStatusChange: PropTypes.func.isRequired,
  projectConfirmedOnBlockchain: PropTypes.element.isRequired
};
