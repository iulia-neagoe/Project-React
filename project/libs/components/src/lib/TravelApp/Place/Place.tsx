import Card from '@trimbleinc/modus-react-bootstrap/esm/Card';
import styles from './Place.module.css';
import { Place } from '@project/models';
import { useState } from 'react';
import { RatingComponent } from '../Rating/Rating';
import { ModusDatePicker } from '@trimble-oss/modus-react-components';
import { Form } from '@trimbleinc/modus-react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// eslint-disable-next-line @nx/enforce-module-boundaries
interface IPlaceComponentProps {
  place: Place;
}
export function PlaceComponent(props: IPlaceComponentProps) {
  const place = props.place;
  // const handleRatingChange = (newRating: number) => {
  //   setRating(newRating);
  // };

  return (
    <Card style={{ width: '18rem' }} border="dark" className="shadow">
      <Card.Header>
        <Card.Title as="h4">{place.title} </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Img>{place.image}</Card.Img>
        <Card.Text as="h5">{place.description}</Card.Text>

        <RatingComponent rating={place.rating}></RatingComponent>
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
      </Card.Body>
    </Card>
  );
}
