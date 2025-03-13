import { render, screen } from '@testing-library/react';
import { PlaceComponent } from './Place';
import { describe, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

const place = {
  title: 'New York',
  dateStart: new Date('2024-07-09'),
  dateEnd: new Date('2024-07-12'),
  description: 'Business trip to New York',
  image: undefined,
  rating: 3,
};

describe('Place', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PlaceComponent place={place} />);
    expect(baseElement).toBeTruthy();
    screen.debug();
    expect(screen.queryByText('New York')).toBeInTheDocument();
    const dateStartElement = screen.getByText(/Start date:/);
    expect(dateStartElement).toHaveTextContent('Start date: Tue Jul 09 2024');
    const dateEndElement = screen.getByText(/End date:/);
    expect(dateEndElement).toHaveTextContent('End date: Fri Jul 12 2024');
    expect(screen.queryByText('Business trip to New York')).toBeInTheDocument();
    // expect(screen.queryByText('Rating: 3')).toBeInTheDocument();
  });
});
