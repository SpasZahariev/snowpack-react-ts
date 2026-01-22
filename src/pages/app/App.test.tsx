import * as React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  // Check for the main heading
  const heading = screen.getByText(/Spas Zahariev/i);
  expect(heading).toBeInTheDocument();
});
