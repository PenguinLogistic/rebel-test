import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import styles from "../scss/AddPopUp.module.scss";

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
            <Form.Control
              className={styles.control__wrapper}
              type="text"
              placeholder="New artist's name"
              autoFocus
              required
            />
            <Form.Label>Rate</Form.Label>
            <Form.Control
              className={styles.control__wrapper}
              type="number"
              step="any"
              min="0"
              placeholder="eg. 0.04"
              required
            />
            <Form.Label>Streams</Form.Label>
            <Form.Control
              className={styles.control__wrapper}
              type="number"
              min="0"
              placeholder="eg. 100"
              required
            />
          </Form.Group>
          <Row>
            <Col className={styles.button__container}>
              <Button className={styles.button__wrapper} onClick={handler}>
                Exit
              </Button>
            </Col>
            <Col className={styles.button__container}>
              <Button className={styles.button__wrapper} type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
