import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ListPlace from './ListPlace';

describe('ListPlace', () => {
  it('should render successfully the component', () => {
    const { baseElement } = render(<ListPlace />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the initial list', () => {
    // const places = [
    //   {
    //     title: 'New York',
    //     dateStart: new Date(),
    //     dateEnd: new Date('2024-07-12'),
    //     description: 'Business trip to New York',
    //     image: undefined,
    //     rating: 3,
    //   },
    //   {
    //     title: 'Paris',
    //     dateStart: new Date(),
    //     dateEnd: new Date('2024-07-12'),
    //     description: 'Business trip to Paris',
    //     image: undefined,
    //     rating: 5,
    //   },
    // ];

    const container = render(
      // <>
      //   {places.map((place, index) => (
      //     <PlaceComponent key={index} place={place} />
      //   ))}
      // </>
      <ListPlace></ListPlace>
    );
    //expect(container).toBeInTheDocument();
    expect(screen.queryByText('Paris')).toBeInTheDocument();
    expect(screen.queryByText('New York')).toBeInTheDocument();
    expect(screen.queryByText('Romania')).not.toBeInTheDocument();
  });

  it('should render the new component Add Place', () => {
    render(<ListPlace></ListPlace>);
    expect(screen.queryByText('Add Place')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Add Place'));
    expect(screen.getByTestId('testAddPlace')).toBeInTheDocument();
  });
});
