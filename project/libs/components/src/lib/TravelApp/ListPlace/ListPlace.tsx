import { useState } from 'react';
import { PlaceComponent } from '../Place/Place';
import styles from './ListPlace.module.css';
import { Place } from '@project/models';
import { Button } from '@trimbleinc/modus-react-bootstrap';
import { AddPlace } from '../AddPlace/AddPlace';

export function ListPlace() {
  const [places, setPlaces] = useState<Place[]>([
    {
      title: 'New York',
      dateStart: new Date(),
      dateEnd: new Date('2024-07-12'),
      description: 'Business trip to New York',
      image: undefined,
      rating: 3,
    },
    {
      title: 'Paris',
      dateStart: new Date(),
      dateEnd: new Date('2024-07-12'),
      description: 'Business trip to New York',
      image: undefined,
      rating: 5,
    },
  ]);

  return (
    <>
      {places.map((place) => {
        return <PlaceComponent place={place}></PlaceComponent>;
      })}
      <Button
      //   onClick={() => {
      //     const listCopy = [...places];
      //     listCopy.push({
      //       title: 'Romania',
      //       dateStart: new Date(),
      //       dateEnd: new Date('2024-07-12'),
      //       description: 'Bucuresti',
      //       image: undefined,
      //       rating: 3,
      //     });
      //     setPlaces(listCopy);
      //   }}
      >
        Add Place
      </Button>
    </>
  );
}

export default ListPlace;
