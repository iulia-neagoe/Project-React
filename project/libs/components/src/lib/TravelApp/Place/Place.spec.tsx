import { render } from '@testing-library/react';

import Place from './Place';

describe('Place', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Place />);
    expect(baseElement).toBeTruthy();
  });
});
