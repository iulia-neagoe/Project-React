import { render } from '@testing-library/react';

import ListPlace from './ListPlace';

describe('ListPlace', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListPlace />);
    expect(baseElement).toBeTruthy();
  });
});
