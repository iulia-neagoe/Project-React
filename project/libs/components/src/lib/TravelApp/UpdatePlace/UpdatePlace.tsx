import styles from './UpdatePlace.module.css';
import { Alert, Button, Card, Modal } from '@trimbleinc/modus-react-bootstrap';
import { RatingComponent } from '../Rating/Rating';
import { FormErrors, Place } from '@project/models';
import { useState } from 'react';
interface IUpdatePlaceProps {
  place: Place;
  close: () => void;
  update: (
    id: number,
    title: string,
    description: string,
    dateStart: Date,
    dateEnd: Date,
    rating: number,
    image?: string
  ) => void;
}
export function UpdatePlace(props: IUpdatePlaceProps) {
  const place = props.place;
  const [title, setTitle] = useState(place.title);
  const [description, setDescription] = useState(place.description);
  const [dateStart, setDateStart] = useState(place.dateStart);
  const [dateEnd, setDateEnd] = useState(place.dateEnd);
  const [image, setImage] = useState(place.image);
  const [rating, setRating] = useState(place.rating);
  const [errors, setErrors] = useState<FormErrors>({});
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!place.title) newErrors.title = 'Title is required';
    if (!place.description) newErrors.description = 'Description is required';
    if (!place.dateStart) newErrors.dateStart = 'Start Date is required';
    if (!place.dateEnd) newErrors.dateEnd = 'End Date is required';
    if (place.dateEnd > place.dateStart)
      newErrors.dateEnd = 'End Date cannot be before Start Date';
    if (!place.image) newErrors.image = 'Image URL is required';
    if (place.rating <= 0) newErrors.rating = 'Rating must be greater than 0';
    return newErrors;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const id = place.id;
    if (!id) {
      console.error('Invalid place ID');
      return;
    }
    const url = `http://localhost:5001/api/Travelapp/${id}`;
    try {
      const body = {
        id: id,
        title: title,
        description: description,
        dateStart: parseDate(dateStart),
        dateEnd: parseDate(dateEnd),
        rating: rating,
        image: image,
      };
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        props.update(id, title, description, dateStart, dateEnd, rating, image);
        props.close();

        console.log('Place updated successfully');
      } else {
        console.error('Failed to update place', response.statusText);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating place:', error.message);
      }
    }
  };

  function parseDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    let monthString;
    if (month.toString().length === 1) {
      monthString = '0' + month.toString();
    } else {
      monthString = month.toString();
    }
    const day = date.getDate();
    let dayString;
    if (day.toString().length === 1) {
      dayString = '0' + day.toString();
    } else {
      dayString = day.toString();
    }
    return `${year}-${monthString}-${dayString}`;
  }
  return (
    <div className="modal show" style={{ display: 'block' }}>
      <Modal.Dialog>
        <form onSubmit={handleSubmit}>
          <Modal.Title>
            <h1> Edit Place</h1>
          </Modal.Title>
          <Modal.Body>
            <Card>
              <Card.Body>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    data-testid="titleInput"
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setErrors({ ...errors, title: '' });
                    }}
                  />
                  {errors.title && (
                    <Alert variant="danger">{errors.title}</Alert>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    data-testid="descriptionInput"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  {errors.description && (
                    <Alert variant="danger">{errors.description}</Alert>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={parseDate(dateStart)}
                    data-testid="dateStartInput"
                    onChange={(e) => {
                      setDateStart(new Date(e.target.value));
                      setErrors({ ...errors, dateStart: '' });
                    }}
                  />
                  {errors.dateStart && (
                    <Alert variant="danger">{errors.dateStart}</Alert>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={parseDate(dateEnd)}
                    data-testid="dateEndInput"
                    onChange={(e) => {
                      setDateEnd(new Date(e.target.value));
                      setErrors({ ...errors, dateEnd: '' });
                    }}
                  />
                  {errors.dateEnd && (
                    <Alert variant="danger">{errors.dateEnd}</Alert>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="text"
                    className="form-control"
                    value={image}
                    data-testid="ImageInput"
                    onChange={(e) => {
                      setImage(e.target.value);
                      setErrors({ ...errors, image: '' });
                    }}
                  />
                  {errors.image && (
                    <Alert variant="danger">{errors.image}</Alert>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <RatingComponent
                    rating={rating}
                    onRatingChange={(newRating) => {
                      setRating(newRating);
                      setErrors({ ...errors, rating: '' });
                    }}
                  />
                  {errors.rating && (
                    <Alert variant="danger">{errors.rating}</Alert>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button variant="secondary" onClick={props.close}>
                Close
              </Button>
            </div>
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Dialog>
    </div>
  );
}
