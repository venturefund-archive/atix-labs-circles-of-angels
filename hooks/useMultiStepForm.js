import React, { useState, useEffect } from 'react';
import CustomButton from '../components/atoms/CustomButton/CustomButton';

export default function useMultiStepForm(
  formFields,
  formSteps,
  initialStep,
  submitCallback,
  hasMainPage = false, // FIXME : this should go somewhere else
  showMainPage // FIXME : this should go somewhere else
) {
  // FIXME : it should validate initial state.
  const [fields, setFields] = useState(formFields);
  const [steps] = useState(formSteps);
  const [currentStep, setCurrentStep] = useState(initialStep);

  // TODO : This should replace all steps!
  //        Allowing to add or delete predefinied steps dynamically.
  const setStep = (number, step) => {
    if (number <= 0 || number > steps.length) return;
    steps[number] = step;
  };

  // TODO : should this be async?
  // Default validator
  const validate = (rule, value) => {
    let isValid = true;

    // TODO : why is this happening?
    if (value === undefined) {
      value = '';
    }

    const v = rule.whitespace ? value.trim() : value;

    if (rule.required) {
      isValid = isValid && v.length > 0;
    }
    if (rule.regex) {
      isValid = isValid && v.match(rule.regex);
    }
    return isValid;
  };

  const getFieldValue = field => field.value || field.selected || field.checked;

  const getInvalidRule = field => {
    // TODO : input.value wont work for Checkbox (and maybe Select).
    if (field.rules === undefined || field.rules.length === 0) return undefined;

    // find the first not satisfied rule
    return field.rules.find(rule => {
      // allow custom validators.
      const validator = rule.validator ? rule.validator : validate;
      return !validator(rule, getFieldValue(field), fields)
        ? rule.message
        : undefined;
    });
  };

  const validateField = field => {
    const rule = getInvalidRule(field);

    const valid = rule === undefined;
    const errorMessage = valid ? undefined : rule.message;

    return {
      ...field,
      valid,
      errorMessage
    };
  };

  const handleChange = (event, fieldName, newValue) => {
    // custom onChange handlers due antd's Select onChange behavior
    // if event is undefied it expects to receive a fieldName and its newValue
    let value;

    if (event) {
      event.persist();
      value =
        newValue || event.target.value !== undefined
          ? event.target.value
          : event.target.name;
    } else {
      value = newValue;
    }

    const name = fieldName || event.target.name;
    const field = fields[name];
    field.value = value;

    setFields({
      ...fields,
      [field.name]: validateField(field)
    });
  };

  const validateFields = event => {
    event.preventDefault();

    const validatedFields = steps[currentStep].fields.reduce(
      (acc, fieldName) =>
        Object.assign(
          acc,
          { [fieldName]: validateField(fields[fieldName]) },
          {}
        ),
      {}
    );
    setFields({ ...fields, ...validatedFields });
    return Object.values(validatedFields).every(i => i.valid);
  };

  const isLast = step => step === steps.length - 1;

  const nextStep = e => {
    const last = isLast(currentStep);
    const isValid = validateFields(e);

    if (!isValid) return;

    if (last) setShouldSubmit(true);
    else setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep === 0) {
      if (hasMainPage) showMainPage(fields);
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const isFormValid = () => Object.values(fields).every(i => i.valid);

  // FIXME : this should go somewhere else
  function getNextStepButton(current) {
    const lastText = hasMainPage ? 'Save & Continue!' : 'Finish!';
    return (
      <CustomButton
        theme="Primary"
        buttonText={isLast(current) ? lastText : 'Next'}
        onClick={nextStep}
        disabled={!isFormValid}
      />
    );
  }

  function getPrevStepButton(current) {
    if (current === 0 && !hasMainPage) return;

    return (
      <CustomButton theme="Secondary" buttonText="Back" onClick={prevStep} />
    );
  }

  const [shouldSubmit, setShouldSubmit] = useState(false);

  useEffect(() => {
    if (shouldSubmit) {
      submitCallback(fields);
      setShouldSubmit(false);
    }
  }, [shouldSubmit, submitCallback, fields]);

  return [
    fields,
    setFields,
    steps,
    setStep,
    currentStep,
    handleChange,
    getNextStepButton,
    getPrevStepButton
  ];
}
