import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import AutocompleteCountriesNames from "./index";



test('render AutocompleteCountriesNames component and check change event', async () => {
  render(<AutocompleteCountriesNames />);
  const input = screen.getByLabelText('autocomplete countries names') as HTMLInputElement
  fireEvent.change(input, {target: {value: 'Moldova'}});
  expect(input.value).toBe('Moldova');
});

test('clear input on button click', () => {
  render(<AutocompleteCountriesNames />);
  const input = screen.getByLabelText('autocomplete countries names') as HTMLInputElement;
  const button = screen.getByLabelText('clear') as HTMLButtonElement;
  fireEvent.click(button);
  expect(input.value).toBe('');
});
