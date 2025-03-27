import { render } from '@testing-library/react';

import UpdatePlace from './UpdatePlace';

describe('UpdatePlace', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpdatePlace />);
    expect(baseElement).toBeTruthy();
  });
});
