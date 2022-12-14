import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './coa-indicators-card.scss';
import { Divider, Icon, Collapse } from 'antd';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { formatCurrency } from 'helpers/formatter';
import classNames from 'classnames';
import { ConditionalWrapper } from 'components/atoms/ConditionalWrapper/ConditionalWrapper';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';

const { Panel } = Collapse;

const CardHeader = ({
  title,
  entity,
  onCreate,
  onEdit,
  onRemove,
  onClick,
  extra,
  withStatusTag,
  status,
  statusMap,
  onViewEvidence,
  onAddEvidences
}) => (
  <div
    className="o-coaIndicatorsCard__header"
    onClick={onClick}
    tabIndex={0}
    role="button"
    onKeyDown={onClick}
  >
    <div className="o-coaIndicatorsCard__header__left">
      <div className="o-coaIndicatorsCard__header__title">{title}</div>
      {extra}
    </div>
    <div className="o-coaIndicatorsCard__header__right">
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
          <Icon type="edit" /> Edit
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
          <Icon type="delete" /> Delete
        </CoaTextButton>
      )}
      {onViewEvidence && (
        <CoaTextButton onClick={onViewEvidence}>
          <Icon type="eye" /> View evidences
        </CoaTextButton>
      )}
      {onAddEvidences && (
        <CoaTextButton
          onClick={onViewEvidence}
          disabled={['to-review', 'approved'].includes(status)}
        >
          <Icon type="plus" /> Add evidences
        </CoaTextButton>
      )}
      {withStatusTag && (
        <CoaTag predefinedColor={statusMap?.[status]?.color}>{statusMap?.[status]?.name}</CoaTag>
      )}
    </div>
  </div>
);

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
  remaining,
  className,
  isCollapsible,
  alwaysShowBudget,
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
              onAddEvidences
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
            <div className="o-coaIndicatorsCard__body__indicators">
              <div className="o-coaIndicatorsCard__body__indicators__container">
                <Icon type="wallet" className="o-coaIndicatorsCard__iconIndicator" />
                <div className="o-coaIndicatorsCard__body__indicators__indicator">
                  <p className="o-coaIndicatorsCard__body__indicators__indicator__title">Budget</p>
                  <p className="o-coaIndicatorsCard__body__indicators__indicator__value">
                    {formatCurrency(currency, budget)}
                  </p>
                </div>
                <div className="o-coaIndicatorsCard__body__indicators__indicator">
                  <p className="o-coaIndicatorsCard__body__indicators__indicator__title">Spent</p>
                  <p className="o-coaIndicatorsCard__body__indicators__indicator__value">
                    {formatCurrency(currency, spent)}
                  </p>
                </div>
                <div className="o-coaIndicatorsCard__body__indicators__indicator">
                  <p className="o-coaIndicatorsCard__body__indicators__indicator__title">
                    Remaining
                  </p>
                  <p className="o-coaIndicatorsCard__body__indicators__indicator__value">
                    {formatCurrency(currency, remaining)}
                  </p>
                </div>
              </div>
              {withEvidences && (
                <>
                  <Divider type="vertical" style={{ height: '32px', margin: '0 1.31rem' }} />
                  <div className="o-coaIndicatorsCard__body__indicators__container">
                    <Icon type="file-text" className="o-coaIndicatorsCard__iconIndicator" />
                    <div className="o-coaIndicatorsCard__body__indicators__indicator">
                      <p className="o-coaIndicatorsCard__body__indicators__indicator__title">
                        Evidences
                      </p>
                      <p className="o-coaIndicatorsCard__body__indicators__indicator__value">
                        {transferQuantity} Transfer <Icon type="right" /> {impactQuantity} Impact
                        <Icon type="right" />
                      </p>
                    </div>{' '}
                  </div>
                </>
              )}
            </div>
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
  extra: undefined
};

CardHeader.propTypes = {
  title: PropTypes.string,
  entity: PropTypes.string,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  extra: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
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
  alwaysShowBudget: false
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
  alwaysShowBudget: PropTypes.bool
};
