import React, { useState, useEffect } from 'react';

export default function useMultiStepForm(
  formFields,
  formSteps,
  initialStep,
  submitCallback
) {
  const [fields, setFields] = useState(formFields);
  const [steps, setSteps] = useState(formSteps);
  const [currentStep, setCurrentStep] = useState(initialStep);


  // TODO : This should replace all steps!
  //        Allowing to add or delete predefinied steps dynamically. 
  const setStep = (number, step) => {
    if (number <= 0 || number > steps.length) return;
    steps[number] = step;
  }

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
      isValid = isValid && v && v.length > 0;
    }
    if (rule.regex) {
      // console.log(rule.regex);
      isValid = isValid && v.match(rule.regex);
    }
    return isValid;
  };

  const getFieldValue = field => {
    return field.value || field.selected || field.checked;
  };

  const isValidField = field => {
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
    const rule = isValidField(field);

    const valid = rule === undefined;
    const errorMessage = valid ? undefined : rule.message;

    return {
      ...field,
      valid,
      errorMessage
    };
  };

  const handleChange = (event, fieldName, newValue) => {
    console.log(event, fieldName, newValue);

    // custom onChange handlers due antd's Select onChange behavior
    // if event is undefied it expects to receive inputName and newValue
    if (event !== undefined && event.persist) {
      event.persist();
    }

    const value = newValue !== undefined ? newValue : event.target.value;
    // const value = newValue || event.target.value;
    const name = fieldName || event.target.name;
    const field = fields[name];

    field.value = value;

    setFields({
      ...fields,
      [field.name]: validateField(field)
    });
  };

  const handleSubmit = (event, isLastStep) => {
    event.preventDefault();

    const validatedFields = steps[currentStep].fields.reduce(
      (acc, fieldName) =>
        Object.assign(acc, { [fieldName]: fields[fieldName] }, {}),
      {}
    );
    setFields({ ...fields, ...validatedFields });

    const isValid = Object.values(validatedFields).every(i => i.valid);
    console.log('last', isLastStep, validatedFields, isValid);

    // TODO : useEffect
    if (isValid && isLastStep) {
      submitCallback();
    }

    return isValid;
  };

  return [
    fields,
    setFields,
    steps,
    setStep,
    currentStep,
    setCurrentStep,
    handleChange,
    handleSubmit
  ];
}
