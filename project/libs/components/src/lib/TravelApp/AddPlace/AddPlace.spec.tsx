import { render } from '@testing-library/react';

import AddPlace from './AddPlace';

describe('AddPlace', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddPlace />);
    expect(baseElement).toBeTruthy();
  });
});
