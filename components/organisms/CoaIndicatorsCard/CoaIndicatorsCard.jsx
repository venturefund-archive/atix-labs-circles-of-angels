import React from 'react';
import './coa-indicators-card.scss';
import { Divider, Icon } from 'antd';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { formatCurrency } from 'helpers/formatter';

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
  remaining
}) => {
  return (
    <div className="o-coaIndicatorsCard">
      <div className="o-coaIndicatorsCard__header">
        <div className="o-coaIndicatorsCard__header__title">{title}</div>
        <div>
          {entity && (
            <CoaTextButton onClick={onCreate}>
              <Icon type="plus" /> {`Add ${entity}`}
            </CoaTextButton>
          )}
          <CoaTextButton onClick={onEdit}>
            <Icon type="edit" /> Edit
          </CoaTextButton>
          <CoaTextButton onClick={onRemove}>
            <Icon type="delete" /> Delete
          </CoaTextButton>
        </div>
      </div>
      <Divider className="o-coaIndicatorsCard__divider" />
      <div className="o-coaIndicatorsCard__body">
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
        {additionalBody}
      </div>
    </div>
  );
};
