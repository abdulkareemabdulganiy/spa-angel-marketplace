import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ContextStore } from './ContextStore';
import App from './App';

test('renders app without crashing', () => {
  render(
    <ContextStore>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextStore>
  );
  // Basic test to ensure the app renders without crashing
  const element = screen.getByText(/All for you.../i);
  expect(element).toBeInTheDocument();
});