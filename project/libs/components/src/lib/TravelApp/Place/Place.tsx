import Card from '@trimbleinc/modus-react-bootstrap/esm/Card';
import { Place } from '@project/models';
import { RatingComponent } from '../Rating/Rating';
import { Button } from '@trimbleinc/modus-react-bootstrap';
import { useState } from 'react';
import { UpdatePlace } from '../UpdatePlace/UpdatePlace';
import { set } from 'react-datepicker/dist/date_utils';
import { on } from 'events';

interface IPlaceComponentProps {
  place: Place;
  onDelete: (id: number) => void;
  onUpdate: (
    id: number,
    title: string,
    description: string,
    dateStart: Date,
    dateEnd: Date,
    rating: number,
    image?: string
  ) => void;
}
export function PlaceComponent(props: IPlaceComponentProps) {
  const place = props.place;
  const [showEditPlace, setShowEditPlace] = useState(false);
  const onDelete = async () => {
    const id = place.id;
    const url = `http://localhost:5001/api/Travelapp/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      console.log(response);
      if (response.ok) {
        props.onDelete(id);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  const clickEditPlace = () => {
    setShowEditPlace(true);
  };

  return (
    <Card style={{ width: '18rem' }} border="dark" className="shadow">
      <Card.Header>
        <Card.Title as="h4">{place.title} </Card.Title>
      </Card.Header>
      <Card.Body>
        {/* <Card.Img>{place.image}</Card.Img> */}
        <Card.Text as="h5">{place.description}</Card.Text>

        <RatingComponent
          rating={place.rating}
          readonly={true}
        ></RatingComponent>
        <div>Start date: {place.dateStart.toDateString()}</div>
        <div>End date: {place.dateEnd.toDateString()}</div>
        <Button onClick={onDelete}>Delete</Button>
        <hr />
        <Button onClick={clickEditPlace}>Edit</Button>
        {showEditPlace && (
          <UpdatePlace
            place={place}
            close={() => {
              setShowEditPlace(false);
            }}
            update={props.onUpdate}
          />
        )}
      </Card.Body>
    </Card>
  );
}
