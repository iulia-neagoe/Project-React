import { Alert, Button, Card, Modal } from '@trimbleinc/modus-react-bootstrap';
import { useState } from 'react';
import { RatingComponent } from '../Rating/Rating';
import { newDate, set } from 'react-datepicker/dist/date_utils';
import { FormErrors, Place } from '@project/models';
interface IAddPlaceProps {
  close: () => void;
  save: (
    title: string,
    description: string,
    dateStart: Date,
    dateEnd: Date,
    image: string,
    rating: number
  ) => void;
}

export function AddPlace(props: IAddPlaceProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!dateStart) newErrors.dateStart = 'Start Date is required';
    if (!dateEnd) newErrors.dateEnd = 'End Date is required';
    if (dateEnd < dateStart)
      newErrors.dateEnd = 'End Date cannot be before Start Date';
    if (!image) newErrors.image = 'Image URL is required';
    if (rating <= 0) newErrors.rating = 'Rating must be greater than 0';
    return newErrors;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Submit form
      props.save(title, description, dateStart, dateEnd, image, rating);
      props.close();
    }
  };
  function parseDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    let monthString;
    if (month.toString().length === 1) {
      monthString = '0' + month.toString();
    } else {
      monthString = month.toString();
    }
    const day = date.getDay();
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
            <h1>Add Place</h1>
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
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setErrors({ ...errors, description: '' });
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
              Save changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Dialog>
    </div>
  );
}
