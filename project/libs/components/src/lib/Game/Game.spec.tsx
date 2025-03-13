import { render } from '@testing-library/react';

import { GameComponent } from './Game';

describe('Game', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameComponent />);
    expect(baseElement).toBeTruthy();
  });
});
