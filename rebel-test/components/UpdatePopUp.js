import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import styles from "../scss/UpdatePopUp.module.scss";

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
              className={styles.control__wrapper}
              type="number"
              step="any"
              placeholder={`Former Rate: ` + artist.rate}
              min="0"
              autoFocus
              required
            />
          </Form.Group>
          <Row>
            <Col className={styles.form__container}>
              <Button className={styles.button__wrapper} onClick={handler}>
                Exit
              </Button>
            </Col>
            <Col className={styles.form__container}>
              <Button className={styles.button__wrapper} type="submit">
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
