import { Modal, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default function UpdatePopUp({ show, handler, artist, onUpdate }) {
  return (
    <Modal show={show} onHide={handler}>
      <Modal.Header closeButton>
        <Modal.Title>Update information on {artist.artist}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form as="form" onSubmit={onUpdate}>
          <Form.Group>
            <Form.Label>Enter new Rate</Form.Label>
            <Form.Control
              type="number"
              step="any"
              placeholder={artist.rate}
              min="0"
              autoFocus
              required
            />
          </Form.Group>
          <Button onClick={handler}>Exit</Button>
          <Button type="submit">Update</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
