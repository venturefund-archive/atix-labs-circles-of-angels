import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './coa-tag.scss';
import { DictionaryContext } from 'components/utils/DictionaryContext';

export const CoaTag = ({ children, predefinedColor, predefinedSize }) => {
  const { texts } = React.useContext(DictionaryContext);

  const customStatusMap = {
    'not started': texts?.status?.noStarted,
    'new': texts?.status?.new,
    'rejected': texts?.status?.rejected,
    'approved': texts?.status?.approved,
    'draft': texts?.status?.draft,
    'in progress': texts?.status?.inProgress,
    'in review': texts?.status?.inReview,
    'canceled': texts?.status?.canceled,
    'completed': texts?.status?.completed,
    'published': texts?.status?.published,
  }

  return (
    <Tag
      className={classNames('coaTag', {
        [`--${predefinedColor}`]: Boolean(predefinedColor),
        [`--${predefinedSize}`]: Boolean(predefinedSize)
      })}
    >
      {
        typeof(children) ==='string' && customStatusMap[children.toLowerCase()]
          ? customStatusMap[children.toLowerCase()]
          : children
      }
    </Tag>
  );
}

CoaTag.defaultProps = {
  children: '',
  predefinedColor: '',
  predefinedSize: 'small'
};

CoaTag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  predefinedColor: PropTypes.oneOf(['green', 'orange', 'yellow', 'gray', 'blue', 'red']),
  predefinedSize: PropTypes.oneOf(['small', 'big'])
};
