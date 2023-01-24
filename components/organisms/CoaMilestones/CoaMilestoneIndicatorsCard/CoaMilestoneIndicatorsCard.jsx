import React from 'react';
import { Divider, Icon } from 'antd';
import classNames from 'classnames';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { CoaTextButton } from 'components/atoms/CoaTextButton/CoaTextButton';
import { CoaMilestoneIndicators } from 'components/molecules/CoaMilestoneIndicators/CoaMilestoneIndicators';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import './coa-milestone-indicators-card.scss';

export const CoaMilestoneIndicatorsCard = ({
  additionalBody,
  title,
  onEdit,
  onRemove,
  onCreate,
  entity,
  currency,
  budget,
  className,
  isCollapsible,
  alwaysShowBudget,
  withStatusTag,
  status,
  statusMap,
  spending,
  payback,
  funding,
  withEvidences,
  impactQuantity,
  transferQuantity,
  projectType
}) => {
  const { texts } = React.useContext(DictionaryContext);
  return (
    <div className={classNames(className, 'o-coaMilestoneIndicatorsCard')}>
      {!isCollapsible && (
        <>
          <div className={classNames('o-coaMilestoneIndicatorsCard__header')}>
            <div className="o-coaMilestoneIndicatorsCard__header__left">
              <div className="o-coaMilestoneIndicatorsCard__header__title">{title}</div>
            </div>
            <div className="o-coaMilestoneIndicatorsCard__header__right">
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
              {withStatusTag && (
                <CoaTag predefinedColor={statusMap?.[status]?.color}>
                  {statusMap?.[status]?.name}
                </CoaTag>
              )}
            </div>
          </div>
          <Divider className="o-coaMilestoneIndicatorsCard__divider" />
        </>
      )}

      <div className="o-coaMilestoneIndicatorsCard__body">
        {(parseFloat(budget) > 0 || alwaysShowBudget) && (
          <CoaMilestoneIndicators
            {...{
              currency,
              funding,
              spending,
              payback,
              withEvidences,
              impactQuantity,
              transferQuantity,
              projectType
            }}
          />
        )}
        {additionalBody}
      </div>
    </div>
  );
};
