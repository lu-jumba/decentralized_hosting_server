import { render, screen, fireEvent } from '@testing-library/react';
import DAppUpload from '../components/DAppUpload';

test('renders dApp upload form', () => {
  render(<DAppUpload />);
  const uploadButton = screen.getByText(/Upload dApp/i);
  expect(uploadButton).toBeInTheDocument();
});

test('submits valid dApp upload', async () => {
  render(<DAppUpload />);
  const nameInput = screen.getByPlaceholderText(/App Name/i);
  const descriptionInput = screen.getByPlaceholderText(/App Description/i);
  const versionInput = screen.getByPlaceholderText(/Version/i);
  const fileInput = screen.getByLabelText(/Choose File/i);

  fireEvent.change(nameInput, { target: { value: 'Test DApp' } });
  fireEvent.change(descriptionInput, { target: { value: 'A decentralized app' } });
  fireEvent.change(versionInput, { target: { value: '1.0' } });
  fireEvent.change(fileInput, { target: { files: [new File([], 'test.zip')] } });

  fireEvent.click(screen.getByText(/Upload dApp/i));

  // Simulate a successful upload
  await screen.findByText(/DApp uploaded successfully/i);
});
