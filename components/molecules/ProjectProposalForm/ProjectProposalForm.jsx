import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Field from '../../atoms/Field/Field';
import { fieldPropType } from '../../../helpers/proptypes';

const ProjectProposalForm = ({ fields, handleChange }) => {
  useEffect(() => {
    // FIXME: if the form is submitted empty the htmlEditor component throws an error
    //        This may not the best way to fix it, but it works for now
    if (!fields.proposal.value) {
      // eslint-disable-next-line no-param-reassign
      fields.proposal.value = '';
    }
  }, [fields]);

  return (
    <Fragment>
      <Row type="flex" justify="space-around" align="middle">
        <Col sm={24} md={24} lg={24}>
          <p>Complete Project Proposal</p>
        </Col>
        <Col className="HtmlEditor" sm={24} md={24} lg={24}>
          <Field {...fields.proposal} handleChange={handleChange} />
        </Col>
      </Row>
    </Fragment>
  );
};

ProjectProposalForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    proposal: PropTypes.shape(fieldPropType)
  }).isRequired
};

export default ProjectProposalForm;
