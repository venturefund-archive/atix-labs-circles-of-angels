import React from 'react';
import PropTypes from 'prop-types';

export const thumbnailsFormInputs = {
  location: {
    name: 'location',
    label: 'Country of Impact',
    placeholder: 'Country of Impact',
    rules: [
      {
        required: true,
        message: 'Please input the country this project will impact on!',
        whitespace: true
      }
    ]
  },
  projectName: {
    name: 'projectName',
    label: 'Project Name',
    placeholder: 'Project Name',
    rules: [
      {
        required: true,
        message: 'Please input the name of the project!',
        whitespace: true
      }
    ]
  },
  timeframe: {
    name: 'timeframe',
    label: 'Timeframe',
    placeholder: 'Timeframe',
    rules: [
      {
        required: true,
        message: 'Please input the timeframe',
        whitespace: true
      }
    ]
  },
  goalAmount: {
    name: 'goalAmount',
    label: 'Goal Amount',
    placeholder: 'Goal Amount',
    rules: [
      {
        required: true,
        message: 'Please input the goal amount!'
      },
      {
        validator: (_, value) => !Number.isNaN(Number(value)),
        message: 'The goal amount should be a number'
      }
    ]
  },
  cardPhotoPath: {
    name: 'cardPhotoPath',
    label: 'Click to upload',
    type: 'file',
    rules: [
      {
        required: true,
        message: 'Please upload a thumbnail image for your project!',
        validator: (rule, value) => {
          const checkValue = value || '';
          if (checkValue.length > 0) return true;
          if (checkValue.file && checkValue.file instanceof File) return true;
          return false;
        }
      }
    ]
  }
};

export const detailsFormInputs = {
  mission: {
    type: 'textArea',
    name: 'mission',
    rows: 4,
    label: (
      <div className="LabelDescription">
        Project Mission
        <span>
          Share your Project Mission, the impact you have made so far and what
          your project is about
        </span>
      </div>
    ),
    placeholder: 'Project mission',
    rules: [
      {
        required: true,
        message: 'Please input the mission of this project!',
        whitespace: true
      }
    ]
  },
  problemAddressed: {
    type: 'textArea',
    name: 'problemAddressed',
    rows: 4,
    label: (
      <div className="LabelDescription">
        The Problem
        <span>
          Share with us the problem that you are tackling, what you are trying
          to solve and how the funds will help support your goal
        </span>
      </div>
    ),
    placeholder: 'The problem',
    rules: [
      {
        required: true,
        message: 'Please input the problem that your project aims to solve!',
        whitespace: true
      }
    ]
  },
  coverPhotoPath: {
    name: 'coverPhotoPath',
    label: 'Click to upload',
    type: 'file',
    rules: [
      {
        required: true,
        message: 'Please upload a background image for your project!',
        validator: (rule, value) => {
          const checkValue = value || '';
          if (checkValue.length > 0) return true;
          if (checkValue.file && checkValue.file instanceof File) return true;
          return false;
        }
      }
    ]
  }
};

export const proposalFromItems = {
  proposal: {
    type: 'htmlEditor',
    name: 'proposal',
    rules: [
      {
        required: true,
        message: 'Please input the project proposal!',
        whitespace: true
      }
    ]
  }
};

export const milestonesFormItems = {
  milestoneFile: {
    name: 'milestoneFile',
    label: 'Click to upload',
    type: 'file',
    rules: [
      {
        required: false,
        message: 'Please upload the milestones information for your project!',
        validator: (rule, value) => {
          if (value && value.file && !(value.file instanceof File)) {
            return false;
          }
          return true;
        }
      }
    ]
  }
};
