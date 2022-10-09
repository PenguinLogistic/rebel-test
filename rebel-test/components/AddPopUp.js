import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function popUp({ show, handler, addFunc }) {
  return (
    <Modal show={show} onHide={handler}>
      <Modal.Header closeButton>
        <Modal.Title>Add an Artist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form as="form" onSubmit={addFunc}>
          <Form.Group>
            <Form.Label>Artist</Form.Label>
            <Form.Control type="text" autoFocus required />
            <Form.Label>Rate</Form.Label>
            <Form.Control type="number" step="any" min="0" required />
            <Form.Label>Streams</Form.Label>
            <Form.Control type="number" min="0" required />
          </Form.Group>
          <Button onClick={handler}>Exit</Button>
          <Button type="submit">Add</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
