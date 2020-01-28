import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import './_style.scss';
import CardProject from '../../molecules/CardProject/CardProject';
import CardNewProyect from '../CardNewProyect/CardNewProyect';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import { projectCardPropType } from '../../../helpers/proptypes';

const ProjectBrowser = ({
  title,
  projects,
  onTagClick,
  onCardClick,
  onNewProject
}) => (
  <div className="Content ExploreProject">
    <Row>
      <Col span={14}>
        <TitlePage textTitle={title} />
      </Col>
    </Row>
    <Row className="ProjectsCardsContainer" gutter={16}>
      {onNewProject && <CardNewProyect onClick={onNewProject} />}
      {projects &&
        projects.map(project => (
          <CardProject
            project={project}
            tagClick={() => onTagClick(project.id)}
            key={project.id}
            onClick={() => onCardClick(project)}
          />
        ))}
    </Row>
  </div>
);

ProjectBrowser.defaultProps = {
  onNewProject: undefined
};

ProjectBrowser.propTypes = {
  title: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape(projectCardPropType)).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  onNewProject: PropTypes.func
};

export default ProjectBrowser;
