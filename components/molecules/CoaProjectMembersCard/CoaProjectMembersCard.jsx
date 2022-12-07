import { Avatar, Icon, Tooltip } from 'antd';
import { MembersIcon } from 'components/atoms/CustomIcons/MembersIcon';
import React from 'react';
import './coa-project-members-card.scss';

export const CoaProjectMembersCard = ({ beneficiary, investor, auditors }) => {
  return (
    <div className="m-coaProjectMembersCard">
      <div className="m-coaProjectMembersCard__title">
        <MembersIcon />
        <h2>Project Members</h2>
      </div>
      <div className="m-coaProjectMembersCard__members">
        <div className="m-coaProjectMembersCard__members__item">
          <div className="m-coaProjectMembersCard__members__title">
            <Icon type="smile" />
            <h3>Beneficiary</h3>
          </div>
          <div className="m-coaProjectMembersCard__members__avatar">
            {Boolean(beneficiary) && (
              <Tooltip
                placement="topLeft"
                title={
                  <div className="m-coaProjectMembersCard__tooltip">
                    <h5>{beneficiary?.firstName}</h5>
                    <p>Beneficiary</p>
                    <ul>
                      <li>{beneficiary?.email}</li>
                    </ul>
                  </div>
                }
              >
                <Avatar icon="user" />
              </Tooltip>
            )}
            {!beneficiary && '-'}
          </div>
        </div>
        <div className="m-coaProjectMembersCard__members__item">
          <div className="m-coaProjectMembersCard__members__title">
            <Icon type="dollar" />
            <h3>Investors</h3>
          </div>
          {Boolean(investor) && (
            <Tooltip
              placement="topLeft"
              title={
                <div className="m-coaProjectMembersCard__tooltip">
                  <h5>{investor?.firstName}</h5>
                  <p className="m-coaProjectMembersCard__tooltip__role">Investor</p>
                  <ul>
                    <li>{investor?.email}</li>
                  </ul>
                </div>
              }
            >
              <Avatar icon="user" />
            </Tooltip>
          )}
          {!investor && '-'}
        </div>
        <div className="m-coaProjectMembersCard__members__item">
          <div className="m-coaProjectMembersCard__members__title">
            <Icon type="audit" />
            <h3>Auditors</h3>
          </div>
          {Boolean(auditors) &&
            auditors?.map(auditor => (
              <Tooltip
                placement="topLeft"
                title={
                  <div className="m-coaProjectMembersCard__tooltip">
                    <h5>{auditor?.firstName}</h5>
                    <p>Auditor</p>
                    <ul>
                      <li>{auditor?.email}</li>
                    </ul>
                  </div>
                }
              >
                <Avatar icon="user" />
              </Tooltip>
            ))}
          {!auditors && '-'}
        </div>
      </div>
    </div>
  );
};

CoaProjectMembersCard.defaultProps = {
  beneficiary: undefined,
  investor: undefined,
  auditors: undefined
};
