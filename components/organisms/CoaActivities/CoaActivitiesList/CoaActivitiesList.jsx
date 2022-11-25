import React from 'react';
import { CoaActivityItem } from '../CoaActivityItem/CoaActivityItem';

export const CoaActivitiesList = ({ data = [], currency, onRemove, onEdit, milestone }) => {
  return data.map((activity, index) => (
    <CoaActivityItem
      {...{ currency, activity, onRemove, onEdit, milestone }}
      {...{ activityNumber: index + 1 }}
    />
  ));
};
