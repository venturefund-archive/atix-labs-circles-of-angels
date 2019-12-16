export const thumbnailsFormInputs = {
  countryOfImpact: {
    name: 'countryOfImpact',
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
        validator: (_, value) => !isNaN(value),
        message: "The goal amount should be a number"
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
  problem: {
    type: 'textArea',
    name: 'problem',
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
  }
};

export const proposalFromItems = {
  proposal: {
    type: 'htmlEditor',
    name: 'proposal',
    rules: [
      {
        required: true,
        message: 'Please input the mission of this project!',
        whitespace: true
      }
    ]
  }
};
