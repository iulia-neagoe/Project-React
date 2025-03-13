import { render } from '@testing-library/react';

import { RatingComponent } from './Rating';

describe('Rating', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RatingComponent rating={0} />);
    expect(baseElement).toBeTruthy();
  });
});
