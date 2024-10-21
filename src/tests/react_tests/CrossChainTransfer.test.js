import { render, screen, fireEvent } from '@testing-library/react';
import CrossChainTransfer from '../components/CrossChainTransfer';

test('renders cross-chain transfer form', () => {
  render(<CrossChainTransfer />);
  const sendButton = screen.getByText(/Send Message/i);
  expect(sendButton).toBeInTheDocument();
});

test('submits cross-chain message successfully', async () => {
  render(<CrossChainTransfer />);
  const messageInput = screen.getByPlaceholderText(/Message to send/i);
  const chainSelect = screen.getByRole('combobox');

  fireEvent.change(messageInput, { target: { value: 'Hello Ethereum' } });
  fireEvent.change(chainSelect, { target: { value: 'Ethereum' } });

  fireEvent.click(screen.getByText(/Send Message/i));

  // Simulate successful message sending
  await screen.findByText(/Cross-chain message sent/i);
});
