import { useState } from 'react';

export default function useForm(formFields, submitCallback) {
  const [fields, setFields] = useState(formFields);
  const [submitting, setSubmitting] = useState(false);

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
      const notEmpty = Number.isNaN(Number(v))
        ? v.length > 0
        : v.toString().length > 0;

      isValid = isValid && notEmpty;
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
    // debugger;
    if (event !== undefined) {
      if (typeof event.persist === 'function') {
        event.persist();
      }
      value =
        newValue || event.target.value !== undefined
          ? event.target.value
          : event.target.name;
    } else {
      value = newValue;
    }

    const name = fieldName || event.target.name;
    const field = { ...fields[name] };
    field.value = value;

    setFields({
      ...fields,
      [field.name]: validateField(field)
    });
  };

  const validateFields = () => {
    const validatedFields = Object.keys(fields).reduce(
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

  const isFormValid = () => Object.values(fields).every(field => field.valid);

  const handleSubmit = async onSubmit => {
    const validated = validateFields();
    if (!validated) return;
    if (submitting === true) {
      return;
    }
    setSubmitting(true);
    const data = new FormData();
    Object.values(fields).forEach(field => {
      if (field.value) {
        if (field.type === 'file') {
          Object.entries(field.value).forEach(([filename, file]) => {
            data.append(filename, file);
          });
        } else {
          data.set(field.name, field.value);
        }
      }
    });

    const result = await onSubmit(data);
    setSubmitting(false);
    return result;
  };

  return [fields, setFields, handleChange, handleSubmit, submitting];
}
