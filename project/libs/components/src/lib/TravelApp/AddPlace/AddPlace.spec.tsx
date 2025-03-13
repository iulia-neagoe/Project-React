import { fireEvent, render, screen } from '@testing-library/react';

import { AddPlace } from './AddPlace';
import { describe, it, vi } from 'vitest';

// eslint-disable-next-line @nx/enforce-module-boundaries
import '@testing-library/user-event';
import { IRatingProps } from '../Rating/Rating';
vi.mock('../Rating/Rating', async (importoriginal) => {
  const module: object = await importoriginal();
  return {
    ...module,
    RatingComponent: vi.fn().mockImplementation((props: IRatingProps) => {
      return (
        <button
          data-testid="mockratingcomponent"
          onClick={() => {
            props.onRatingChange?.(5);
          }}
        ></button>
      );
    }),
  };
});

describe('AddPlace', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddPlace
        close={() => {
          return;
        }}
        save={() => {
          return;
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render the inputs', () => {
    render(
      <AddPlace
        close={() => {
          return;
        }}
        save={() => {
          return;
        }}
      />
    );
    const titleInput = screen.getByTestId('titleInput');
    expect(titleInput).toBeInTheDocument();
    const descriptionInput = screen.getByTestId('descriptionInput');
    expect(descriptionInput).toBeInTheDocument();
    const dateStartInput = screen.getByTestId('dateStartInput');
    expect(dateStartInput).toBeInTheDocument();
    const dateEndInput = screen.getByTestId('dateEndInput');
    expect(dateEndInput).toBeInTheDocument();
  });
  it('should show errors', () => {
    const saveMock = vi.fn();
    render(
      <AddPlace
        close={() => {
          return;
        }}
        save={saveMock}
      />
    );
    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(saveMock).toBeCalledTimes(0);
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(screen.getByText('Image URL is required')).toBeInTheDocument();
    expect(
      screen.getByText('Rating must be greater than 0')
    ).toBeInTheDocument();
  });
  it('should close', () => {
    const closeMock = vi.fn();
    const saveMock = vi.fn();
    render(<AddPlace close={closeMock} save={saveMock} />);
    const button = screen.getByText('Close');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(closeMock).toBeCalledTimes(1);
  });
  it('should  save without errors', () => {
    const saveMock = vi.fn();
    render(
      <AddPlace
        close={() => {
          return;
        }}
        save={saveMock}
      />
    );
    const titleInput = screen.getByTestId('titleInput');
    fireEvent.change(titleInput, { target: { value: 'Romania' } });
    expect(titleInput).toBeInTheDocument();
    const descriptionInput = screen.getByTestId('descriptionInput');
    fireEvent.change(descriptionInput, { target: { value: 'Vacation' } });
    expect(descriptionInput).toBeInTheDocument();
    const dateStartInput = screen.getByTestId('dateStartInput');
    expect(dateStartInput).toBeInTheDocument();
    const dateEndInput = screen.getByTestId('dateEndInput');
    expect(dateEndInput).toBeInTheDocument();
    const imageInput = screen.getByTestId('ImageInput');
    fireEvent.change(imageInput, { target: { value: 'image' } });
    expect(imageInput).toBeInTheDocument();
    const ratingInput = screen.getByTestId('mockratingcomponent');
    fireEvent.click(ratingInput);
    expect(ratingInput).toBeInTheDocument();
    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(saveMock).toBeCalledTimes(1);
  });
});
