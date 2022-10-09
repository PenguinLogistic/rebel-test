import { Modal, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default function UpdatePopUp({ show, handler, artist, onDelete }) {
  return (
    <Modal show={show} onHide={handler}>
      <Modal.Header closeButton>
        <Modal.Title>
          Are you sure you want to delete {artist.artist}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form as="form" onSubmit={onDelete}>
          <Button onClick={handler}>Exit</Button>
          <Button type="submit">Delete</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
