import { Button, Card, Modal } from '@trimbleinc/modus-react-bootstrap';

export function AddPlace() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Title>
          <p>Add Place</p>
        </Modal.Title>
        <Card>
          <Card.Title></Card.Title>
        </Card>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
