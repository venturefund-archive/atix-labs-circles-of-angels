/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import '../../../pages/_style.scss';
import '../../../pages/registersteps';
import { Steps } from 'antd';

import CustomButton from '../../atoms/CustomButton/CustomButton';
import useMultiStepForm from '../../../hooks/useMultiStepForm';
import { questionsByRole } from './steps/RegisterStep3';

const { Step } = Steps;

// TODO : refactor as functional component
function RegisterForm({ formFields, formSteps, initialStep }) {
  // TODO : this cannot be here!
  function finishForm() {
    const values = formSteps.map(step =>
      Object.values(step.inputs).map(input => [input.name, input.value])
    );
    const parsed = Array.prototype.concat.apply([], values);
    // TODO : send data to register endpoint
    console.log('complete form', parsed);
  }

  const [
    fields,
    setFields,
    steps,
    setNextStep,
    currentStep,
    setCurrentStep,
    handleChange,
    handleSubmit
  ] = useMultiStepForm(formFields, formSteps, initialStep, () => finishForm());

  const isLast = step => step === steps.length - 1;

  function next(e) {
    const last = isLast(currentStep);
    if (handleSubmit(e, last)) {
      console.log('next step!', currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  }

  function prev() {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  }

  const isFormValid = () => Object.values(fields).every(i => i.valid);

  function getNextStepButton(current) {
    return (
      <CustomButton
        theme="Primary"
        buttonText={isLast(current) ? 'Finish!' : 'Save and continue'}
        onClick={next}
        disabled={!isFormValid}
      />
    );
  }

  function getPrevStepButton(current) {
    if (current === 0) return;

    return (
      <CustomButton theme="Secondary" buttonText="Previous" onClick={prev} />
    );
  }
  function getStepComponent(current) {
    const Component = steps[current].component;
    return (
      <Component
        fields={fields}
        setFields={setFields}
        setNextStep={setNextStep}
        handleChange={handleChange}
      />
    );
  }

  return (
    <div className="RegisterSteps">
      <div className="BlockSteps">
        <Steps progressDot current={currentStep}>
          {formSteps.map((item, index) => (
            <Step key={'bleep-'.concat(index)} title={item.title} />
          ))}
        </Steps>
      </div>
      <div className="vertical BlockContent">
        <div className="steps-content">{getStepComponent(currentStep)}</div>
        <div className="steps-action">
          {getNextStepButton(currentStep)}
          {getPrevStepButton(currentStep)}
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

// TODO : leaving as a reference
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
