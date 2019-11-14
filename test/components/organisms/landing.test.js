import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/dom';
import ModalLogin from '../../../components/organisms/ModalLogin/ModalLogin';
import TopBar from '../../../components/organisms/TopBar/TopBar';
import Landing from '../../../pages/landing';

test('When login button clicked it should display modal login', async () => {
  // TODO: using text to get the login button is a workaround, it should be getted usin data-testid
  //       Which didnt work for me.
  // WIP! could not get the modal because its not being rendered inside landing div

  const props = {
    loginText: 'Login'
  };

  const { loginText } = props;
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );

  const loginButton = getByText(loginText);

  console.log(getByTestId('modal'));
});
