import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import styles from "../scss/DeletePopUp.module.scss";
export default function UpdatePopUp({ show, handler, artist, onDelete }) {
  return (
    <Modal show={show} onHide={handler}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.header__wrapper}>
          Are you sure you want to delete {artist.artist}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form as="form" onSubmit={onDelete}>
          <Row>
            <Col className={styles.button__container}>
              <Button onClick={handler}>Exit</Button>
            </Col>
            <Col className={styles.button__container}>
              <Button type="submit">Delete</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
