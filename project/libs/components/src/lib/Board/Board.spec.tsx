import { render } from '@testing-library/react';

import { BoardComponent } from './Board';
import { Value } from '@project/models';

describe('Board', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BoardComponent
        onGameFinish={function (value: Value): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
