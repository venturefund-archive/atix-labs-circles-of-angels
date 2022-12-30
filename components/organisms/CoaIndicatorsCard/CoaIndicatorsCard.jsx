import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './coa-indicators-card.scss';
import { Divider, Icon, Collapse } from 'antd';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { CoaIndicators } from 'components/molecules/CoaIndicators/CoaIndicators';
import classNames from 'classnames';
import { ConditionalWrapper } from 'components/atoms/ConditionalWrapper/ConditionalWrapper';
import { ACTIVITY_STATUS_ENUM } from 'model/activityStatus';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { AddEvidenceButton } from '../../atoms/AddEvidenceButton/AddEvidenceButton';

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
      className={classNames('o-coaIndicatorsCard__header', { cardHeader: responsiveLayout })}
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={onClick}
    >
      <div className="o-coaIndicatorsCard__header__left">
        <div className="o-coaIndicatorsCard__header__title">{title}</div>
        {extra}
      </div>
      <div className='o-coaIndicatorsCard__header__right'>
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
            className={classNames({ 'o-coaIndicatorsCard__header__btn': responsiveLayout })}
          >
            <Icon type="eye" /> {texts?.general?.btnView || 'View'}&nbsp;
            <span
              className={classNames({
                'o-coaIndicatorsCard__header__evidenceText': responsiveLayout
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
              [ACTIVITY_STATUS_ENUM.TO_REVIEW, ACTIVITY_STATUS_ENUM.APPROVED].includes(status)
              || isProjectEditing
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

export const CoaIndicatorsCard = ({
  additionalBody,
  title,
  onEdit,
  onRemove,
  onCreate,
  entity,
  currency,
  budget,
  spent,
  deposited,
  remaining,
  className,
  isCollapsible,
  alwaysShowBudget,
  isProjectEditing,
  withStatusTag,
  status,
  statusMap,
  transferQuantity,
  impactQuantity,
  withEvidences,
  onViewEvidence,
  onAddEvidences
}) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  return (
    <div className={classNames(className, 'o-coaIndicatorsCard')}>
      {!isCollapsible && (
        <>
          <CardHeader
            {...{
              title,
              onEdit,
              onRemove,
              onCreate,
              entity,
              withStatusTag,
              status,
              statusMap,
              withEvidences,
              onViewEvidence,
              onAddEvidences,
              isProjectEditing,
            }}
          />
          <Divider className="o-coaIndicatorsCard__divider" />
        </>
      )}
      <ConditionalWrapper
        condition={isCollapsible}
        wrapper={children => (
          <Collapse
            activeKey={isCollapseOpen ? '1' : '0'}
            className="o-coaIndicatorsCard__collapse"
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
                      <Icon type="down" className="o-coaIndicatorsCard__header__icon" />
                    ) : (
                      <Icon type="right" className="o-coaIndicatorsCard__header__icon" />
                    )
                  }
                  onClick={() => setIsCollapseOpen(!isCollapseOpen)}
                  {...{ title, onEdit, onRemove, onCreate, entity }}
                />
              }
              key="1"
            >
              {children}
            </Panel>
          </Collapse>
        )}
      >
        <div className="o-coaIndicatorsCard__body">
          {(parseFloat(budget) > 0 || alwaysShowBudget) && (
            <CoaIndicators
              {...{
                currency,
                budget,
                spent,
                deposited,
                remaining,
                transferQuantity,
                impactQuantity,
                withEvidences
              }}
            />
          )}
          {additionalBody}
        </div>
      </ConditionalWrapper>
    </div>
  );
};

CardHeader.defaultProps = {
  title: undefined,
  entity: undefined,
  onCreate: undefined,
  onEdit: undefined,
  onRemove: undefined,
  onClick: undefined,
  extra: undefined,
  isProjectEditing: false,
};

CardHeader.propTypes = {
  title: PropTypes.string,
  entity: PropTypes.string,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  extra: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  isProjectEditing: PropTypes.bool,
};

CoaIndicatorsCard.defaultProps = {
  additionalBody: undefined,
  title: undefined,
  onEdit: undefined,
  onRemove: undefined,
  onCreate: undefined,
  entity: undefined,
  currency: undefined,
  budget: undefined,
  spent: undefined,
  remaining: undefined,
  className: undefined,
  isCollapsible: false,
  alwaysShowBudget: false,
  isProjectEditing: false,
};

CoaIndicatorsCard.propTypes = {
  additionalBody: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onCreate: PropTypes.func,
  entity: PropTypes.string,
  currency: PropTypes.string,
  budget: PropTypes.string,
  spent: PropTypes.string,
  remaining: PropTypes.string,
  className: PropTypes.string,
  isCollapsible: PropTypes.bool,
  alwaysShowBudget: PropTypes.bool,
  isProjectEditing: PropTypes.bool,
};
