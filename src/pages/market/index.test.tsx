import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Market from './index';

test('renders page title', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Market />
    </MockedProvider>,
  );
  const title = screen.getByText(/Market/i);
  expect(title).toBeInTheDocument();
});
