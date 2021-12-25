import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'framework/web';

test('renders learn react link', async () => {
  render(<App />);

  expect(await screen.findByTestId('app-container')).toBeInTheDocument();
});
