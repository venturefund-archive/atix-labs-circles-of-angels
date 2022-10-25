import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import LogoWrapper from '../../../components/atoms/LogoWrapper';

describe('LogoWrapper component', () => {
  const props = {
    textTitle: 'Hello world'
  };
  const { container } = render(<LogoWrapper {...props} />);
  const image = container.querySelector('img');
  const h1 = container.querySelector('h1');

  it('Logo has corresponding properties', () => {
    const { alt, src } = image
    expect(alt).toEqual('Circles of angels');
    expect(src.includes('/static/images/isologo.svg')).toEqual(true)
  });

  it('h1 has its corresponding properties', () => {
    const { innerHTML } = h1;
    expect(innerHTML).toEqual(props.textTitle);
  });
})
