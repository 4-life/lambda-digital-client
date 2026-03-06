import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Metaverse from './index';

vi.mock('components/MetaBallsCanvas', () => ({ default: () => null }));

test('renders page title', () => {
  render(<Metaverse />);
  const title = screen.getByRole('heading', { name: /Enter the Metaverse/i });
  expect(title).toBeInTheDocument();
});
