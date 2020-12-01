import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Landing from '../../../pages/landing/landing';

it('Renders landing correctly', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>,
    div
  );
});
