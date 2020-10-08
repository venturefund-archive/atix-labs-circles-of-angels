import React from 'react';

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
        required: false
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
  },
  agreementFile: {
    name: 'agreementFile',
    label: 'Click to upload',
    type: 'file',
    valid: true,
    rules: [
      {
        required: false,
        message: 'Please upload a valid agreement file!',
        validator: (rule, value) => {
          if (!value || value.length === 0) return !rule.required;
          if (value.length > 0) return true;
          if (value.file && value.file instanceof File) return true;
          return false;
        }
      }
    ]
  },
  proposalFile: {
    name: 'proposalFile',
    label: 'Click to upload',
    type: 'file',
    valid: true,
    rules: [
      {
        required: false,
        message: 'Please upload a valid proposal file!',
        validator: (rule, value) => {
          if (!value || value.length === 0) return !rule.required;
          if (value.length > 0) return true;
          if (value.file && value.file instanceof File) return true;
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
        validator: (rule, value) => {
          const regex = new RegExp(/<[^>]*>/gm);
          const textContent = value.replace(regex, '');
          return textContent;
        }
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
        message: 'Please upload the milestones information for your project!'
        // validator: (_rule, value) =>
        //   value.length > 0 || (value.file && value.file instanceof File)
      }
    ]
  }
};

export const newMilestoneFormItems = {
  description: {
    name: 'description',
    label: 'Description',
    placeholder: 'Description',
    rules: [
      {
        required: true,
        message: 'Please input the description!',
        whitespace: true
      }
    ]
  },
  category: {
    name: 'category',
    label: 'Category',
    placeholder: 'Category',
    rules: [
      {
        required: true,
        message: 'Please input the category!',
        whitespace: true
      }
    ]
  }
};

export const newActivityFormItems = {
  description: {
    name: 'description',
    label: 'Description',
    placeholder: 'Description',
    rules: [
      {
        required: true,
        message: 'Please input the description!',
        whitespace: true
      }
    ]
  },
  reviewCriteria: {
    name: 'reviewCriteria',
    label: 'Review Criteria',
    placeholder: 'Review Criteria',
    rules: [
      {
        required: true,
        message: 'Please input the review criteria!',
        whitespace: true
      }
    ]
  },
  category: {
    name: 'category',
    label: 'Category',
    placeholder: 'Category',
    rules: [
      {
        required: true,
        message: 'Please input the category!',
        whitespace: true
      }
    ]
  },
  keyPersonnel: {
    name: 'keyPersonnel',
    label: 'Key Personnel',
    placeholder: 'Key Personnel',
    rules: [
      {
        required: true,
        message: 'Please input the key personnel!',
        whitespace: true
      }
    ]
  },
  budget: {
    name: 'budget',
    label: 'Budget',
    placeholder: 'Budget',
    rules: [
      {
        required: true,
        message: 'Please input the budget!'
      },
      {
        validator: (_, value) => !Number.isNaN(Number(value)),
        message: 'The budget should be a number'
      }
    ]
  }
};

export const newExperienceFormItems = {
  comment: {
    name: 'comment',
    placeholder: 'Share your experience here!',
    type: 'textArea',
    rows: 8,
    rules: [
      {
        required: true,
        message: 'Please input the comment',
        whitespace: true
      }
    ]
  },
  photos: {
    name: 'photos',
    label: 'Click to upload',
    type: 'file',
    multiple: true,
    rules: [
      {
        required: true,
        message: 'Please upload the image/s for describe your experience!',
        validator: (_rule, value) => {
          const checkValue = value || '';
          if (checkValue.length > 0) return true;
          if (checkValue.file && checkValue.file instanceof File) return true;
          return false;
        }
      }
    ]
  }
};

export const newFundFormItems = {
  amount: {
    name: 'amount',
    label: 'Amount',
    placeholder: 'Amount',
    rules: [
      {
        required: true,
        message: 'Please input the amount',
        whitespace: true
      },
      {
        validator: (_, value) => !Number.isNaN(Number(value)),
        message: 'The amount should be a number'
      }
    ]
  },
  destinationAccount: {
    name: 'destinationAccount',
    label: 'Destination Account',
    placeholder: 'Destination Account',
    rules: [
      {
        required: true,
        message: 'Please input the destination account',
        whitespace: true
      }
    ]
  },
  // TODO define values of currency
  currency: {
    name: 'currency',
    label: 'Currency',
    placeholder: 'Currency',
    rules: [
      {
        required: true,
        message: 'Please input currency',
        whitespace: true
      }
    ]
  },
  transferId: {
    name: 'transferId',
    label: 'Transfer ID',
    placeholder: 'Transfer ID',
    rules: [
      {
        required: true,
        message: 'Please input the transfer ID',
        whitespace: true
      }
    ]
  },
  receiptPath: {
    name: 'receiptPath',
    label: 'Click to upload',
    type: 'file',
    rules: [
      {
        required: true,
        message: 'Please upload the receipt',
        validator: (_rule, value) => {
          const checkValue = value || '';
          if (checkValue.length > 0) return true;
          if (checkValue.file && checkValue.file instanceof File) return true;
          return false;
        }
      }
    ]
  }
};

export const newTransferClaimFormItems = {
  rejectionReason: {
    name: 'rejectionReason',
    label: 'Rejection reason',
    placeholder: 'Rejection reason',
    rules: [
      {
        required: true,
        message: 'Please input the rejection reason',
        whitespace: true
      }
    ]
  }
};

export const newTaskEvidenceFormItems = {
  description: {
    name: 'description',
    label: 'Claim description',
    placeholder: 'Claim description',
    maxLength: 80,
    rules: [
      {
        required: true,
        message: 'Please input the rejection reason',
        whitespace: true
      }
    ]
  },
  status: {
    name: 'status',
    label: 'Claim status',
    type: 'select',
    placeholder: 'Select',
    defaultValue: undefined,
    options: [
      { name: 'Approved', value: 'approve' },
      { name: 'Disapproved', value: 'disapprove' }
    ],
    rules: [
      {
        required: true,
        message: 'Please select the claim status',
        whitespace: true
      }
    ]
  },
  proof: {
    name: 'proof',
    label: 'Click to upload',
    type: 'file',
    rules: [
      {
        required: true,
        message: 'Please upload the proof',
        validator: (_rule, value) => {
          const checkValue = value || '';
          if (checkValue.length > 0) return true;
          if (checkValue.file && checkValue.file instanceof File) return true;
          return false;
        }
      }
    ]
  }
};
