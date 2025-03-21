/* eslint-disable no-undef */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import EditProject from '../components/molecules/EditProject/EditProject';
import './_style.scss';
import './_back-office-edit-project.scss';
import { updateProject, getProject } from '../api/projectApi';
import { getPhoto } from '../api/photoApi';
import { withUser } from '../components/utils/UserContext';
import { showModalError, showModalSuccess } from '../components/utils/Modals';

class BackOfficeEditProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null
    };
  }

  static async getInitialProps({ query }) {
    const { projectId } = query;
    return { projectId };
  }

  componentDidMount = async () => {
    const { projectId } = this.props;
    const response = await getProject(projectId);

    const cardPhoto = await getPhoto(response.data.cardPhoto);
    const coverPhoto = await getPhoto(response.data.coverPhoto);

    const project = {
      data: {
        faqLink: response.data.faqLink,
        goalAmount: response.data.goalAmount,
        problemAddressed: response.data.problemAddressed,
        mission: response.data.mission,
        location: response.data.location,
        projectName: response.data.projectName,
        timeframe: response.data.timeframe
      },
      files: {
        cardPhoto: cardPhoto.data,
        coverPhoto: coverPhoto.data
      }
    };
    this.setState({ project });
  };

  projectDetailPage = () => {
    const { projectId } = this.props;
    Routing.toBackofficeProjectDetails({ projectId });
  };

  updateProject = async (project, coverPhoto, cardPhoto) => {
    const { projectId } = this.props;
    const response = await updateProject(
      project.data,
      coverPhoto,
      cardPhoto,
      projectId
    );

    if (!response || response.error) {
      const { error } = response;
      const title = error.response
        ? 'Error Updating Project Information'
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    } else {
      showModalSuccess('Success!', 'Project updated successfully!');
    }
  };

  render() {
    const { project } = this.state;
    return (
      <div className="BackOfficeEditProject">
        {project && (
          <EditProject
            project={project}
            onSubmit={this.updateProject}
            onBack={this.projectDetailPage}
          />
        )}
      </div>
    );
  }
}

export default withUser(BackOfficeEditProject);

BackOfficeEditProject.propTypes = {
  projectId: PropTypes.number.isRequired
};
