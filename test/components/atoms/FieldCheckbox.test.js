import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/dom';
import { CheckboxBare } from '../../../components/atoms/Field/FieldCheckbox';

const props = {
  value: false,
  testid: 'field-checkbox',
  label: 'Loren ipsum dolor',
  handleChange: jest.fn()
};

test('should be defined and initialized with false value', () => {
  const { getByTestId, getByText } = render(<CheckboxBare {...props} />);
  const inputCheckbox = getByTestId(props.testid);
  expect(inputCheckbox.value).toBe(false.toString());
  expect(getByText(props.label)).toBeDefined();
});

test('should toogle state when it is checked', () => {
  const { getByTestId } = render(<CheckboxBare {...props} />);
  const inputCheckbox = getByTestId(props.testid);
  fireEvent.click(inputCheckbox);
  expect(inputCheckbox.value).toBeTruthy();
  expect(props.handleChange).toBeCalledTimes(1);
});
