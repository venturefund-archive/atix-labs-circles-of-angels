import React from 'react';
import PropTypes from 'prop-types';

import { Divider, Icon } from 'antd';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import ProjectHeroDetail from '../../atoms/ProjectHeroDetail/ProjectHeroDetail';

import './_style.scss';

const ProjectHeroDetails = ({ country, timeframe, budget, beneficiary, revision }) => {
  const { texts } = React.useContext(DictionaryContext);

  return (
    <div className="m-projectHeroDetails">
      <ProjectHeroDetail
        text={texts?.header?.impact || 'Country of Impact'}
        icon="/static/images/globe.svg"
        title={country}
      />
      <Divider type="vertical" className="m-projectHeroDetails__divider" />
      <ProjectHeroDetail
        text={texts?.header?.timeframe || 'Timeframe'}
        icon="/static/images/calendar.svg"
        title={timeframe}
      />
      <Divider type="vertical" className="m-projectHeroDetails__divider" />
      <ProjectHeroDetail
        text={texts?.header?.budget || 'Budget'}
        icon="/static/images/coin.svg"
        title={budget}
      />
      <Divider type="vertical" className="m-projectHeroDetails__divider" />
      <ProjectHeroDetail
        text={texts?.header?.beneficiary || 'Beneficiary name'}
        icon="/static/images/arrow.svg"
        title={beneficiary}
      />
      <Divider type="vertical" className="m-projectHeroDetails__divider" />
      <ProjectHeroDetail
        text={texts?.header?.projectVersion || 'Project Version'}
        customIcon={<Icon type="info-circle" />}
        title={revision}
      />
    </div>
  );
};

export default ProjectHeroDetails;

ProjectHeroDetails.propTypes = {
  country: PropTypes.string.isRequired,
  timeframe: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  beneficiary: PropTypes.string.isRequired
};
