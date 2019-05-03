import React, { Component } from 'react';
import FormRegister from '../components/organisms/FormRegister/FormRegister';
import './_register.scss';
import './_login.scss';

class Register extends Component {
  static async getInitialProps() {
    const seQuestionnaire = {
      questions: [
        {
          id: 1,
          question:
            'SE How often do you or your firm make angel impact investments?',
          answerLimit: 1,
          answers: [
            { id: 1, answer: 'SE Not yet' },
            {
              id: 2,
              answer: 'SE Less than 1 investment in the last 12 months'
            },
            { id: 3, answer: 'SE 1 to 3 investments in the last 12 months' },
            { id: 4, answer: 'SE 4-5 investments in the last 12 months' },
            {
              id: 5,
              answer: 'SE More than 5 investments in the last 12 months'
            },
            {
              id: 6,
              answer:
                'SE I currently only do philanthropy eg: donate to charitable causes online & offline'
            },
            { id: 7, answer: 'Other' }
          ]
        },
        {
          id: 2,
          question:
            'SE Are you currently an advocate/ volunteer or donor for a social cause? ' +
            'SE If yes, what are the top 3 impact areas you focus on? ' +
            'SE Please select up to 3 UN Sustainable Development Goals',
          answerLimit: 3,
          answers: [
            { id: 1, answer: 'SE No poverty' },
            { id: 2, answer: 'SE Zero Hunger' },
            { id: 3, answer: 'SE Good Health and Well-Being' },
            { id: 4, answer: 'SE Quality Education' },
            { id: 5, answer: 'SE Gender Equality' },
            { id: 6, answer: 'SE Clean Water and Sanitation' },
            { id: 7, answer: 'SE Affordable and Clean Energy' },
            { id: 8, answer: 'SE Decent Work and Economic Growth' },
            { id: 9, answer: 'SE Industry, Innovation and Infrastructure' },
            { id: 10, answer: 'SE Reduced Inequality' },
            { id: 11, answer: 'SE Sustainable Cities and Communities' },
            { id: 12, answer: 'SE Responsible Consumption and Production' },
            { id: 13, answer: 'SE Climate Action' },
            { id: 14, answer: 'SE Life Below Water' },
            { id: 15, answer: 'SE Life on Land' },
            { id: 16, answer: 'SE Peace and Justice Strong Institutions' },
            { id: 17, answer: 'SE Partnerships to Achieve the Goal' }
          ]
        }
      ]
    };

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
            { id: 1, answer: 'No poverty' },
            { id: 2, answer: 'Zero Hunger' },
            { id: 3, answer: 'Good Health and Well-Being' },
            { id: 4, answer: 'Quality Education' },
            { id: 5, answer: 'Gender Equality' },
            { id: 6, answer: 'Clean Water and Sanitation' },
            { id: 7, answer: 'Affordable and Clean Energy' },
            { id: 8, answer: 'Decent Work and Economic Growth' },
            { id: 9, answer: 'Industry, Innovation and Infrastructure' },
            { id: 10, answer: 'Reduced Inequality' },
            { id: 11, answer: 'Sustainable Cities and Communities' },
            { id: 12, answer: 'Responsible Consumption and Production' },
            { id: 13, answer: 'Climate Action' },
            { id: 14, answer: 'Life Below Water' },
            { id: 15, answer: 'Life on Land' },
            { id: 16, answer: 'Peace and Justice Strong Institutions' },
            { id: 17, answer: 'Partnerships to Achieve the Goal' }
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
