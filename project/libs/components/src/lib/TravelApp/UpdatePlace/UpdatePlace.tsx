import styles from './UpdatePlace.module.css';
import { Alert, Button, Card, Modal } from '@trimbleinc/modus-react-bootstrap';
import { RatingComponent } from '../Rating/Rating';

interface IUpdatePlaceProps {
  place: Place;
  onUpdate: (place: Place) => void;
}

export function UpdatePlace(props: IUpdatePlaceProps) {
  const place = props.place;
  const onUpdate = async () => {
    const id = place.id;
    const url = `http://localhost:5001/api/Travelapp/${id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(place),
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
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
                        value={place.title}
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
                        value={place.description}
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
                        value={place.parseDate(dateStart)}
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
                        value={place.parseDate(dateEnd)}
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
                        rating={place.rating}
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
  };
}
export default UpdatePlace;
