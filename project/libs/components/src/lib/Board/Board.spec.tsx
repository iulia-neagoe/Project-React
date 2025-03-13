import { fireEvent, render, screen } from '@testing-library/react';

import { BoardComponent } from './Board';
import { Value } from '@project/models';
import { ISquareProps, Square } from '../Square/Square';

vi.mock('../Rating/Rating', async (importoriginal) => {
  const module: object = await importoriginal();
  return {
    ...module,
    Square: vi.fn().mockImplementation((props: ISquareProps) => {
      return (
        <button data-testid="mocksquarecomponent" onClick={props.onSquareClick}>
          {props.value}
        </button>
      );
    }),
  };
});

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
  it('should game finish', () => {
    //mocking
    const mockGameFinish = vi.fn();
    //act
    render(<BoardComponent onGameFinish={mockGameFinish}></BoardComponent>);
    //assert
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(9);
    fireEvent.click(buttons[0]);
    expect(buttons[0].textContent).toBe('X');
    fireEvent.click(buttons[1]);
    expect(buttons[1].textContent).toBe('O');
    fireEvent.click(buttons[4]);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons[8]);
    expect(mockGameFinish).toBeCalledTimes(1);
    fireEvent.click(buttons[7]);
    expect(buttons[7].textContent).toBe('');
  });
});
