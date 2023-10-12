import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Header', () => {
  render(<App />);
  const header = screen.getByText(/Mouse Analytics Dashboard/i);
  expect(header).toBeInTheDocument();
});
test('renders Footer', () => {
  render(<App />);
  const footer = screen.getByText(/Code Exercise/i);
  expect(footer).toBeInTheDocument();
});
