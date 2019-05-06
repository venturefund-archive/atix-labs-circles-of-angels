import React, { Component } from 'react';
import FormRegister from '../components/organisms/FormRegister/FormRegister';
import './_register.scss';
import './_login.scss';

class Register extends Component {
  static async getInitialProps() {
    const funderQuestionnaire = {
      questions: [
        {
          id: 1,
          question:
            'How often do you or your firm make angel impact investments?',
          answerLimit: 1,
          answers: [
            { id: 1, answer: 'Not yet' },
            { id: 2, answer: 'Less than 1 investment in the last 12 months' },
            { id: 3, answer: '1 to 3 investments in the last 12 months' },
            { id: 4, answer: '4-5 investments in the last 12 months' },
            { id: 5, answer: 'More than 5 investments in the last 12 months' },
            {
              id: 6,
              answer:
                'I currently only do philanthropy eg: donate to charitable causes online & offline'
            },
            { id: 7, answer: 'Other' }
          ]
        },
        {
          id: 2,
          question:
            'Are you currently an advocate/ volunteer or donor for a social cause? ' +
            'If yes, what are the top 3 impact areas you focus on? ' +
            'Please select up to 3 UN Sustainable Development Goals',
          answerLimit: 3,
          answers: [
            { id: 8, answer: 'No poverty' },
            { id: 9, answer: 'Zero Hunger' },
            { id: 10, answer: 'Good Health and Well-Being' },
            { id: 11, answer: 'Quality Education' },
            { id: 12, answer: 'Gender Equality' },
            { id: 13, answer: 'Clean Water and Sanitation' },
            { id: 14, answer: 'Affordable and Clean Energy' },
            { id: 15, answer: 'Decent Work and Economic Growth' },
            { id: 16, answer: 'Industry, Innovation and Infrastructure' },
            { id: 17, answer: 'Reduced Inequality' },
            { id: 18, answer: 'Sustainable Cities and Communities' },
            { id: 19, answer: 'Responsible Consumption and Production' },
            { id: 20, answer: 'Climate Action' },
            { id: 21, answer: 'Life Below Water' },
            { id: 22, answer: 'Life on Land' },
            { id: 23, answer: 'Peace and Justice Strong Institutions' },
            { id: 24, answer: 'Partnerships to Achieve the Goal' }
          ]
        }
      ]
    };

    const seQuestionnaire = {
      questions: [
        {
          id: 3,
          question: 'Type of funding you are seeking:',
          answerLimit: 1,
          answers: [
            { id: 25, answer: 'Grant Funding' },
            {
              id: 26,
              answer: 'Debt Financing'
            },
            { id: 27, answer: 'Equity Financing' },
            { id: 28, answer: 'Combination of blended finance' },
            {
              id: 29,
              answer: 'Not Yet'
            },
            { id: 30, answer: 'Other' }
          ]
        },
        {
          id: 4,
          question:
            'Which are the areas of impact that you tackle based on the UN Sustainable Development Goals?',
          answerLimit: 3,
          answers: [
            { id: 31, answer: 'No poverty' },
            { id: 32, answer: 'Zero Hunger' },
            { id: 33, answer: 'Good Health and Well-Being' },
            { id: 34, answer: 'Quality Education' },
            { id: 35, answer: 'Gender Equality' },
            { id: 36, answer: 'Clean Water and Sanitation' },
            { id: 37, answer: 'Affordable and Clean Energy' },
            { id: 38, answer: 'Decent Work and Economic Growth' },
            { id: 39, answer: 'Industry, Innovation and Infrastructure' },
            { id: 40, answer: 'Reduced Inequality' },
            { id: 41, answer: 'Sustainable Cities and Communities' },
            { id: 42, answer: 'Responsible Consumption and Production' },
            { id: 43, answer: 'Climate Action' },
            { id: 44, answer: 'Life Below Water' },
            { id: 45, answer: 'Life on Land' },
            { id: 46, answer: 'Peace and Justice Strong Institutions' },
            { id: 47, answer: 'Partnerships to Achieve the Goal' }
          ]
        }
      ]
    };

    return { seQuestionnaire, funderQuestionnaire };
  }

  render() {
    const { seQuestionnaire, funderQuestionnaire } = this.props;
    return (
      <div className="Login">
        <div className="LogoSide">
          <img src="/static/images/logo-angels.svg" alt="Circles of Angels" />
        </div>
        <div className="FormSideRegister">
          <h1>Register</h1>
          <FormRegister
            seQuestionnaire={seQuestionnaire}
            funderQuestionnaire={funderQuestionnaire}
          />
        </div>
      </div>
    );
  }
}

export default Register;
