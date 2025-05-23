import { render } from '@testing-library/react';

import { Square } from './Square';

describe('Square', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Square
        value={''}
        onSquareClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
