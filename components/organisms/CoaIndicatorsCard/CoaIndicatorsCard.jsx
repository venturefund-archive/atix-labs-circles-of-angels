import React from 'react';
import './coa-indicators-card.scss';
import { Divider, Icon, Collapse } from 'antd';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { formatCurrency } from 'helpers/formatter';
import classNames from 'classnames';
import { ConditionalWrapper } from 'components/atoms/ConditionalWrapper/ConditionalWrapper';

const { Panel } = Collapse;

const CardHeader = ({ title, entity, onCreate, onEdit, onRemove }) => (
  <div className="o-coaIndicatorsCard__header">
    <div className="o-coaIndicatorsCard__header__title">{title}</div>
    <div>
      {entity && (
        <CoaTextButton
          onClick={e => {
            e.stopPropagation();
            onCreate();
          }}
        >
          <Icon type="plus" /> {`Add ${entity}`}
        </CoaTextButton>
      )}
      <CoaTextButton
        onClick={e => {
          e.stopPropagation();
          onEdit();
        }}
        variant="muted"
      >
        <Icon type="edit" /> Edit
      </CoaTextButton>
      <CoaTextButton
        onClick={e => {
          e.stopPropagation();
          onRemove();
        }}
        variant="danger"
      >
        <Icon type="delete" /> Delete
      </CoaTextButton>
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
  isCollapsible = false
}) => {
  return (
    <div className={classNames('o-coaIndicatorsCard', className)}>
      {!isCollapsible && (
        <>
          <CardHeader {...{ title, onEdit, onRemove, onCreate, entity }} />
          <Divider className="o-coaIndicatorsCard__divider" />
        </>
      )}
      <ConditionalWrapper
        condition={isCollapsible}
        wrapper={children => (
          <Collapse defaultActiveKey={['1']} className="o-coaIndicatorsCard__collapse">
            <Panel
              header={<CardHeader {...{ title, onEdit, onRemove, onCreate, entity }} />}
              key="1"
            >
              {children}
            </Panel>
          </Collapse>
        )}
      >
        <div className="o-coaIndicatorsCard__body">
          {parseFloat(budget) > 0 && (
            <div className="o-coaIndicatorsCard__body__indicators">
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
                <p className="o-coaIndicatorsCard__body__indicators__indicator__title">Remaining</p>
                <p className="o-coaIndicatorsCard__body__indicators__indicator__value">
                  {formatCurrency(currency, remaining)}
                </p>
              </div>
            </div>
          )}
          {additionalBody}
        </div>
      </ConditionalWrapper>
    </div>
  );
};
