import Card from '@trimbleinc/modus-react-bootstrap/esm/Card';
import { Place } from '@project/models';
import { RatingComponent } from '../Rating/Rating';

import 'react-datepicker/dist/react-datepicker.css';
// eslint-disable-next-line @nx/enforce-module-boundaries
interface IPlaceComponentProps {
  place: Place;
  onDelete: (id: number) => void;
}
export function PlaceComponent(props: IPlaceComponentProps) {
  const place = props.place;
  // const handleRatingChange = (newRating: number) => {
  //   setRating(newRating);
  // };
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
        {/* <Card.Title>Select a Date</Card.Title>
        <Form>
          <Form.Group controlId="formDatePicker">
            <Form.Label>From Date: </Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                if (!date) {
                  return;
                }
                setStartDate(date);
              }}
            />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group controlId="formDatePicker">
            <Form.Label>To Date:</Form.Label>
          </Form.Group>
        </Form> */}
        <div>Start date: {place.dateStart.toDateString()}</div>
        <div>End date: {place.dateEnd.toDateString()}</div>
        <button onClick={onDelete}>Delete</button>
      </Card.Body>
    </Card>
  );
}
