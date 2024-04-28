import React from 'react';
import {render, screen} from '@testing-library/react'

import App from './App';

test('renders App header', () => {
  render(<App />);
  expect(screen.getByRole('heading')).toHaveTextContent('Tatsiana\'s Auto-complete component')
});
