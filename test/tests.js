import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Label from '../components/atoms/Label/Label';

test('test label', async () => {
  const props = {
    labelText: 'hola',
    theme: 'my-theme'
  }
  const label = render(<Label {...props} />);

  // TODO : it has to be a shorter way to do this.
  expect(label.container.firstChild.classList.contains('my-theme')).toBe(true);
});
