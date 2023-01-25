import React, { useState } from 'react';
import { Collapse, Icon } from 'antd';
import classNames from 'classnames';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { AddEvidenceButton } from 'components/atoms/AddEvidenceButton/AddEvidenceButton';
import { ACTIVITY_STATUS_ENUM } from 'model/activityStatus';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CoaActivityIndicators } from 'components/molecules/CoaActivityIndicators/CoaActivityIndicators';
import './coa-activity-indicators-card.scss';

const { Panel } = Collapse;

const CardHeader = ({
  title,
  entity,
  onCreate,
  onEdit,
  onRemove,
  onClick,
  extra,
  isProjectEditing,
  withStatusTag,
  status,
  statusMap,
  onViewEvidence,
  onAddEvidences
}) => {
  const { texts } = React.useContext(DictionaryContext);
  const responsiveLayout = onViewEvidence || onAddEvidences;

  return (
    <div
      className={classNames('o-coaActivityIndicatorsCard__header', {
        cardHeader: responsiveLayout
      })}
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={onClick}
    >
      <div className="o-coaActivityIndicatorsCard__header__left">
        <div className="o-coaActivityIndicatorsCard__header__title">{title}</div>
        {extra}
      </div>
      <div className="o-coaActivityIndicatorsCard__header__right">
        {entity && onCreate && (
          <CoaTextButton
            onClick={e => {
              e.stopPropagation();
              onCreate();
            }}
          >
            <Icon type="plus" /> {`Add ${entity}`}
          </CoaTextButton>
        )}
        {onEdit && (
          <CoaTextButton
            onClick={e => {
              e.stopPropagation();
              onEdit();
            }}
            variant="muted"
          >
            <Icon type="edit" /> {texts?.general?.btnEdit || 'Edit'}
          </CoaTextButton>
        )}
        {onRemove && (
          <CoaTextButton
            onClick={e => {
              e.stopPropagation();
              onRemove();
            }}
            variant="danger"
          >
            <Icon type="delete" /> {texts?.general?.btnDelete || 'Delete'}
          </CoaTextButton>
        )}
        {onViewEvidence && (
          <CoaTextButton
            onClick={onViewEvidence}
            className={classNames({ 'o-coaActivityIndicatorsCard__header__btn': responsiveLayout })}
          >
            <Icon type="eye" /> {texts?.general?.btnView || 'View'}&nbsp;
            <span
              className={classNames({
                'o-coaActivityIndicatorsCard__header__evidenceText': responsiveLayout
              })}
            >
              {texts?.coaIndicator?.evidences || 'evidences'}
            </span>
          </CoaTextButton>
        )}
        {onAddEvidences && (
          <AddEvidenceButton
            onClickAddEvidence={onAddEvidences}
            responsiveLayout
            disabled={
              [ACTIVITY_STATUS_ENUM.TO_REVIEW, ACTIVITY_STATUS_ENUM.APPROVED].includes(status) ||
              isProjectEditing
            }
          />
        )}
        {withStatusTag && (
          <CoaTag predefinedColor={statusMap?.[status]?.color}>{statusMap?.[status]?.name}</CoaTag>
        )}
      </div>
    </div>
  );
};

export const CoaActivityIndicatorsCard = ({
  additionalBody,
  title,
  onEdit,
  onRemove,
  onCreate,
  entity,
  currency,
  budget,
  className,
  alwaysShowBudget,
  isProjectEditing,
  withStatusTag,
  status,
  statusMap,
  transferQuantity,
  impactQuantity,
  withEvidences,
  onViewEvidence,
  onAddEvidences,
  color,
  current
}) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  return (
    <div className={classNames(className, 'o-coaActivityIndicatorsCard')}>
      <Collapse
        activeKey={isCollapseOpen ? '1' : '0'}
        className="o-coaActivityIndicatorsCard__collapse"
        expandIcon={() => null}
      >
        <Panel
          header={
            <CardHeader
              onAddEvidences={onAddEvidences}
              onViewEvidence={onViewEvidence}
              withEvidences={withEvidences}
              withStatusTag={withStatusTag}
              status={status}
              statusMap={statusMap}
              isProjectEditing={isProjectEditing}
              extra={
                isCollapseOpen ? (
                  <Icon type="down" className="o-coaActivityIndicatorsCard__header__icon" />
                ) : (
                  <Icon type="right" className="o-coaActivityIndicatorsCard__header__icon" />
                )
              }
              onClick={() => setIsCollapseOpen(!isCollapseOpen)}
              {...{ title, onEdit, onRemove, onCreate, entity }}
            />
          }
          key="1"
        >
          <div className="o-coaActivityIndicatorsCard__body">
            {(parseFloat(budget) > 0 || alwaysShowBudget) && (
              <CoaActivityIndicators
                {...{
                  currency,
                  budget,
                  transferQuantity,
                  impactQuantity,
                  withEvidences,
                  predefinedColor: color,
                  current
                }}
              />
            )}
            {additionalBody}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};
