import { getByTestId, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

import App from './app';
import { ListPlace } from '@project/components';

describe('App', () => {
  it('should render the ListPlace component', () => {
    const { getByTestId } = render(<ListPlace />);
    const placeElement = getByTestId('listplace-component');
    expect(placeElement).toBeInTheDocument();
    // expect(baseElement).toBeTruthy();
  });
});
