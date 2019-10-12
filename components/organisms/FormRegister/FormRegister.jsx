/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
// import './_style.scss';
import '../../../pages/_style.scss';
import '../../../pages/registersteps';
import {
  Steps,
  Button,
  message,
  Form,
  Icon,
  Input,
  Row,
  Col,
  Checkbox
} from 'antd';

// import FormRegister from '../organisms/FormRegister/FormRegister';
// import { getQuestionnaire } from '../api/questionnaireApi';
// import Roles from '../constants/RolesMap';
// import Routes from '../components/utils/Routes';
// import register
import TitlePage from '../../atoms/TitlePage/TitlePage';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import RegisterStep1 from '../RegisterStep1/RegisterStep1';
import RegisterStep2 from '../RegisterStep2/RegisterStep2';
import RegisterStep3 from '../RegisterStep3/RegisterStep3';
import RegisterStep4 from '../RegisterStep4/RegisterStep4';
// https://stackoverflow.com/questions/56878813/how-to-use-getfielddecorator-with-stateless-components
// const FormInput = (props) => {
//   const { }
//   const rules = formRules[name];
//   return (
//     <Form.Item>
//     {

//       getFieldDecorator(name, { rules })
//       (
//       <Input
//         placeholder="Full Name"
//         prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//       />
//     )}
//   </Form.Item>
//   )
// }
const { Step } = Steps;

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    // console.log('aaaa', props)
    this.state = {
      current: 0,
      steps: props.steps
    };
    // console.log(props.)
    // console.log(this.state);
  }

  componentDidMount = async () => {
    // const seQuestionnaire = await getQuestionnaire(Roles.SocialEntrepreneur);
    // const funderQuestionnaire = await getQuestionnaire(Roles.Funder);
    // this.setState({ seQuestionnaire, funderQuestionnaire });
  };

  nextStep(current) {
    // console.log('next step!');
    this.next(current);
    // console.log('nextstep 2', this.state);
  }

  finishRegister() {
    message.success('Processing complete!');
  }

  next(current) {
    this.setState({
      current: current + 1
    });
  }

  prev(current) {
    this.setState({
      current: current - 1
    });
  }

  getNextStepButton(current, stepsLength) {
    const isLast = current === stepsLength - 1;
    return (
      <CustomButton
        theme="Primary"
        buttonText={isLast ? 'Finish!' : 'Save and continue'}
        onClick={
          isLast ? () => this.finishRegister() : () => this.nextStep(current)
        }
      />
    );
  }

  getPrevStepButton(current) {
    if (current === 0) return;

    return (
      <CustomButton
        theme="Secondary"
        buttonText="Previous"
        onClick={() => this.prev(current)}
      />
    );
  }

  render() {
    // const props = {
    //   nextStep: this.nextStep,
    //   currentStep: this.state.currentStep

    // };

    // // const steps = React.Children.map(this.state.steps, (step, i) => {
    // const steps = this.state.steps.map((step, i) => {
    //   props.isActive = (i === props.currentStep);
    //   // console.log(step, React.isValidElement(step));
    //   return React.cloneElement(step, props)
    // });
    // // console.log(steps);
    // return (
    //   <div className={this.props.className}>
    //     { steps }
    //   </div>
    // )
    // // <RegistrationStep />
    const { current, steps } = this.state;
    const isLastStep = current === steps.length - 1;
    // console.log('steps[current]', current, steps[current]);
    return (
      // <div className="RegisterWrapper">
      //   <Row
      //     className="TopBar"
      //     type="flex"
      //     justify="space-between"
      //     align="middle"
      //   >
      //     <Col className="gutter-row" xs={10} sm={4} lg={4}>
      //       <img src="./static/images/icon-large.svg" alt="Circles of Angels" />
      //     </Col>
      //     <Col
      //       className="gutter-row"
      //       xs={12}
      //       sm={{ span: 7, offset: 10 }}
      //       lg={{ span: 3, offset: 14 }}
      //     >
      //       Already Registered? <a href="/">Log In</a>
      //     </Col>
      //   </Row>

      <div className="RegisterSteps">
        <div className="BlockSteps">
          <Steps progressDot current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </div>
        <div className="vertical BlockContent">
          <div className="steps-content">{steps[current]}</div>
          <div className="steps-action">
            {this.getNextStepButton(current, isLastStep)}
            {this.getPrevStepButton(current)}
          </div>
        </div>
      </div>
      // </div>
    );
  }
}

// class AngelsForm extends React.Component {
//   handleSubmit = e => {
//     const { form, seQuestionnaire, funderQuestionnaire } = this.props;
//     e.preventDefault();
//     form.validateFields(async (err, values) => {
//       if (!err) {
//         const user = {
//           usernwame: values.name,
//           email: values.email,
//           pwd: values.password,
//           role: values.role
//         };

//         if (values.role !== '4') {
//           let formQuestionnaire = {};
//           if (values.role === '2') {
//             formQuestionnaire = seQuestionnaire;
//             if (values.phone) {
//               user.detail = {
//                 phoneNumber: values.phone
//               };
//             }

//             if (values.company) {
//               user.detail = {
//                 ...user.detail,
//                 company: values.company
//               };
//             }
//           } else if (values.role === '3') {
//             formQuestionnaire = funderQuestionnaire;
//             if (values.phone) {
//               user.detail = {
//                 phoneNumber: values.phone
//               };
//             }
//           }

//           user.questionnaire = [];
//           formQuestionnaire.questions.forEach(question => {
//             const answers = [];

//             if (values[`question${question.id}`].length > 0) {
//               values[`question${question.id}`].forEach(answer => {
//                 const toSaveAnswer = {
//                   answer
//                 };
//                 if (values[`customAnswer${question.id}`]) {
//                   toSaveAnswer.customAnswer =
//                     values[`customAnswer${question.id}`];
//                 }
//                 answers.push(toSaveAnswer);
//               });
//             } else {
//               const toSaveAnswer = {
//                 answer: values[`question${question.id}`]
//               };
//               if (values[`customAnswer${question.id}`]) {
//                 toSaveAnswer.customAnswer =
//                   values[`customAnswer${question.id}`];
//               }
//               answers.push(toSaveAnswer);
//             }
//             user.questionnaire.push({
//               question: question.id,
//               answers
//             });
//           });
//         }

//         const response = await signUpUser(user);

//         if (!response || response.error) {
//           const { error } = response;
//           const title = error.response ? 'Error!' : error.message;
//           const content = error.response
//             ? error.response.data.error
//             : error.message;
//           showModalError(title, content);
//           return response;
//         }

//         showModalSuccess('Success!', 'User created successfully!');
//         Routing.toLogin();
//         return response;
//       }
//     });
//   };

//   render() {
//     const {
//       form,
//       seQuestionnaire,
//       funderQuestionnaire,
//       goBackHandler
//     } = this.props;
//     const { getFieldDecorator } = form;

//     const tailFormItemLayout = {
//       wrapperCol: {
//         xs: {
//           span: 24,
//           offset: 0
//         },
//         sm: {
//           span: 18,
//           offset: 0
//         }
//       }
//     };

//     const funderInformation = (
//       <span>
//         <Form.Item>
//           {getFieldDecorator('phone', {
//             rules: [
//               { required: false, message: 'Please input your phone number!' }
//             ]
//           })(
//             <Input
//               placeholder="Phone Number"
//               prefix={
//                 <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
//               }
//               style={{ width: '100%' }}
//             />
//           )}
//         </Form.Item>
//       </span>
//     );

//     const seInformation = (
//       <span>
//         <Form.Item>
//           {getFieldDecorator('phone', {
//             rules: [
//               { required: false, message: 'Please input your phone number!' }
//             ]
//           })(
//             <Input
//               placeholder="Phone Number"
//               prefix={
//                 <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
//               }
//               style={{ width: '100%' }}
//             />
//           )}
//         </Form.Item>
//         <Form.Item>
//           {getFieldDecorator('company', {
//             rules: [
//               {
//                 required: false,
//                 whitespace: true
//               }
//             ]
//           })(
//             <Input
//               placeholder="Company Name"
//               prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
//             />
//           )}
//         </Form.Item>
//       </span>
//     );

//     const questionnaireBuilder = questionnaire =>
//       questionnaire.questions.map(question => (
//         <span>
//           <Form.Item
//             className="BlockQuestions"
//             label={question.question}
//             key={question.id}
//           >
//             {getFieldDecorator(`question${question.id}`, {
//               rules: [
//                 {
//                   required: true,
//                   message: 'Please select at least one answer',
//                   type: question.answerLimit > 1 ? 'array' : 'number'
//                 },
//                 {
//                   validator: (rule, value, callback) => {
//                     if (value && question.answerLimit > 1) {
//                       if (value.length > question.answerLimit) {
//                         callback(
//                           `No more than ${question.answerLimit} answers`
//                         );
//                       } else {
//                         callback();
//                       }
//                     } else {
//                       callback();
//                     }
//                   }
//                 }
//               ]
//             })(
//               <Select
//                 prefix={
//                   <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
//                 }
//                 mode={question.answerLimit > 1 ? 'multiple' : 'default'}
//               >
//                 {question.answers.map(answer => (
//                   <Option value={answer.id} key={answer.id}>
//                     {answer.answer}
//                   </Option>
//                 ))}
//               </Select>
//             )}
//           </Form.Item>
//           {question.answerLimit === 1 &&
//             (form.getFieldValue(`question${question.id}`) === 7 ||
//               form.getFieldValue(`question${question.id}`) === 30) && (
//               <Form.Item>
//                 {getFieldDecorator(`customAnswer${question.id}`, {
//                   rules: [
//                     {
//                       required:
//                         question.answerLimit === 1 &&
//                         form.getFieldValue(`question${question.id}`) === 7,
//                       message: 'Please especify',
//                       whitespace: true
//                     }
//                   ]
//                 })(<TextArea placeholder="Answer" rows={2} />)}
//               </Form.Item>
//             )}
//         </span>
//       ));

//     return (
//       <Form layout="vertical">
//         <Form.Item>
//           {getFieldDecorator('role', {
//             rules: [
//               {
//                 required: true,
//                 message: 'Please select your role!'
//               }
//             ]
//           })(
//             <Select
//               placeholder="Role"
//               prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//               initialValue="2"
//             >
//               <Option value="2">SE</Option>
//               <Option value="3">Funder</Option>
//               <Option value="4">Oracle</Option>
//             </Select>
//           )}
//         </Form.Item>

//         {form.getFieldValue('role') === '3' && funderInformation}
//         {form.getFieldValue('role') === '3' &&
//           questionnaireBuilder(funderQuestionnaire)}
//         {form.getFieldValue('role') === '2' && seInformation}
//         {form.getFieldValue('role') === '2' &&
//           questionnaireBuilder(seQuestionnaire)}

//         <Form.Item {...tailFormItemLayout}>
//           <CustomButton
//             theme="Primary"
//             buttonText="Create your angels account"
//             onClick={this.handleSubmit}
//           />
//         </Form.Item>
//         <Form.Item>
//           <CustomButton
//             theme="Cancel"
//             buttonText="Cancel"
//             onClick={goBackHandler}
//           />
//         </Form.Item>
//       </Form>
//     );
//   }
// }

// const FormRegister = Form.create({ name: 'AngelsForm' })(RegisterForm);

// export default FormRegister;
