import { useEffect, useState } from 'react';
import { PlaceComponent } from '../Place/Place';
import { Place } from '@project/models';
import { Button } from '@trimbleinc/modus-react-bootstrap';
import { AddPlace } from '../AddPlace/AddPlace';

export function ListPlace() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [showAddPlace, setShowAddPlace] = useState(false);
  const clickAddPlace = () => {
    setShowAddPlace(true);
  };
  const deletePlace = (id: number) => {
    const placesCopy = [...places];
    const filterArray = placesCopy.filter((place) => {
      return place.id !== id;
    });
    setPlaces(filterArray);
  };
  useEffect(() => {
    async function getData() {
      const url = 'http://localhost:5001/api/Travelapp';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        const places: Place[] = data.map((item: Place) => ({
          id: item.id,
          title: item.title,
          dateStart: new Date(item.dateStart),
          dateEnd: new Date(item.dateEnd),
          description: item.description,
          image: item.image,
          rating: item.rating,
        }));

        setPlaces(places);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
    getData();
  }, []);
  return (
    <>
      {places.map((place) => {
        return (
          <PlaceComponent place={place} onDelete={deletePlace}></PlaceComponent>
        );
      })}
      <div>
        <Button onClick={clickAddPlace}>Add Place</Button>
        {showAddPlace && (
          <div data-testid="testAddPlace">
            <AddPlace
              close={() => {
                setShowAddPlace(false);
              }}
              save={(
                id: number,
                title: string,
                description: string,
                dateStart: Date,
                dateEnd: Date,
                image: string,
                rating: number
              ) => {
                const place = {
                  id: id,
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
