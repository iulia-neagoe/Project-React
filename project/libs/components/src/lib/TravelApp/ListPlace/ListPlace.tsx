import { useState } from 'react';
import { PlaceComponent } from '../Place/Place';
import { Place } from '@project/models';
import { Button } from '@trimbleinc/modus-react-bootstrap';
import { AddPlace } from '../AddPlace/AddPlace';

export function ListPlace() {
  const [places, setPlaces] = useState<Place[]>([
    {
      title: 'New York',
      dateStart: new Date('2024-07-09'),
      dateEnd: new Date('2024-07-12'),
      description: 'Business trip to New York',
      image: undefined,
      rating: 3,
    },
    {
      title: 'Paris',
      dateStart: new Date('2024-07-09'),
      dateEnd: new Date('2025-07-12'),
      description: 'Business trip to New York',
      image: undefined,
      rating: 5,
    },
  ]);
  const [showAddPlace, setShowAddPlace] = useState(false);
  const clickAddPlace = () => {
    setShowAddPlace(true);
  };

  return (
    <>
      {places.map((place) => {
        return <PlaceComponent place={place}></PlaceComponent>;
      })}
      <div>
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
          onClick={clickAddPlace}
        >
          Add Place
        </Button>
        {showAddPlace && (
          <div data-testid="testAddPlace">
            <AddPlace
              close={() => {
                setShowAddPlace(false);
              }}
              save={(
                title: string,
                description: string,
                dateStart: Date,
                dateEnd: Date,
                image: string,
                rating: number
              ) => {
                const place = {
                  title: title,
                  description: description,
                  dateStart: dateStart,
                  dateEnd: dateEnd,
                  image: image,
                  rating: rating,
                };

                const placesCopy = [...places];
                placesCopy.push(place);
                setPlaces(placesCopy);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ListPlace;
