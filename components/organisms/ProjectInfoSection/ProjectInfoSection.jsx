import React from 'react';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import './project-info-section.scss';
import PropTypes from 'prop-types';

const HorizontalBlockText = ({ title, content, orderNumber }) => (
  <div className="m-horizontalBlockText">
    <TitlePage
      className="m-horizontalBlockText__title"
      textTitle={title}
      textColor="#4C7FF7"
      underlineColor="#4C7FF7"
      orderNumber={orderNumber}
    />
    <div className="m-horizontalBlockText__content">{content}</div>
  </div>
);

export const ProjectInfoSection = ({ about, mission }) => (
  <div className="o-projectInfoSection">
    <div className="o-projectInfoSection__text">
      <HorizontalBlockText title="About the Project" content={about} orderNumber="01" />
      <HorizontalBlockText title="Mission and Vision" content={mission} orderNumber="02" />
    </div>
  </div>
);

ProjectInfoSection.propTypes = {
  about: PropTypes.string,
  mission: PropTypes.string
};

ProjectInfoSection.defaultProps = {
  about:
    'Having spent a lot of time volunteering for different charities across East Africa since 2008, Jacqueline got inspired by the many kids she has met over the years to launch Shule. The foundation’s ultimate goal is to bring quality education to boys who are denied this fundamental human right. \n\n Many of the children she meets on the streets of Uganda are very intelligent, despite having little to no access to education due to their family’s economic status. Resulting in their potential often being unfulfilled.',
  mission:
    'Our mission is to empower families + communities through job creation. Each handwoven Yellow Leaf Hammock is created by an artisan from the hill-tribe communities of rural Thailand. \n\n By creating safe, high-wage weaving jobs, we divert families from toxic slash + burn agriculture and end the cycle of debt slavery. \n\n Good jobs empower + transform communities for generations.'
};

HorizontalBlockText.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  orderNumber: PropTypes.number
};

HorizontalBlockText.defaultProps = {
  title: undefined,
  content: undefined,
  orderNumber: undefined
};
