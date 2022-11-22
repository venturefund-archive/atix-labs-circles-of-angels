import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, message } from 'antd';
import './_style.scss';
import CardProject from '../../molecules/CardProject/CardProject';
import CardNewProject from '../../molecules/CardProject/CardNewProject';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import { projectCardPropType } from '../../../helpers/proptypes';
import Roles from '../../../constants/RolesMap';
import { getCountries } from '../../../api/userApi';

const ProjectBrowser = ({ title, userRole, projects, onTagClick, onCardClick, onNewProject }) => {
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      const countryOptions = response
        ? response.map(({ id, name }) => ({
            value: id,
            name
          }))
        : [];
      setCountries(countryOptions);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="Content ExploreProject">
      <Row>
        <Col span={14}>
          <TitlePage textTitle={title} style={{ fontWeight: '700' }} />
        </Col>
      </Row>
      <div className="projectBrowser__cardsContainer">
        {(userRole === Roles.ENTREPRENEUR || userRole === Roles.COA_ADMIN) && onNewProject && (
          <CardNewProject onClick={onNewProject} />
        )}
        {projects &&
          projects.length > 0 &&
          projects.map(
            project =>
              project && (
                <CardProject
                  project={project}
                  tagClick={() => onTagClick(project.id)}
                  key={project.id}
                  onClick={() => onCardClick(project)}
                  countries={countries}
                />
              )
          )}
      </div>
    </div>
  );
};

ProjectBrowser.defaultProps = {
  onNewProject: undefined
};

ProjectBrowser.propTypes = {
  title: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape(projectCardPropType)).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  onNewProject: PropTypes.func
};

export default ProjectBrowser;
