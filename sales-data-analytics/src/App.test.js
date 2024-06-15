import { render, screen } from '@testing-library/react';
import App from './App';

test('renders data source selector', () => {
  render(<App />);
  const linkElement = screen.getByText(/Select S3/i);
  expect(linkElement).toBeInTheDocument();
});
